'use server';
import { cookies } from 'next/headers';

import * as z from 'zod';

import { API_URL, AUTH_TOKEN, SESSION_TOKEN } from '@/data/constants';
import { decrypt, encrypt } from '@/lib/encryption';
import { LoginSchema, RegisterSchema } from '@/lib/schemas';

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	try {
		const res = await fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			body: JSON.stringify(validatedFields.data),
		});

		const response = await res.json();

		if (response.token) {
			cookies().set({
				name: AUTH_TOKEN,
				value: encrypt(response.token),
				secure: true,
				httpOnly: true,
				path: '/',
				sameSite: true,
			});
			cookies().set({
				name: SESSION_TOKEN,
				value: encrypt(JSON.stringify(response.user)),
				secure: true,
			});
		}
		return response;
	} catch (error) {
		return { error: 'Internal server error' };
	}
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	const res = await fetch(`${API_URL}/auth/register`, {
		method: 'POST',
		body: JSON.stringify(validatedFields.data),
		headers: {
			'content-type': 'application/json',
		},
	});

	const response = await res.json();
	console.log('[CLIENT > REGISTER_ACTION > RESPONSE] - ', response);

	return response;
};

export const logout = async () => {
	await removeToken();
};

export async function getUser() {
	const chipertext = cookies().get(SESSION_TOKEN)?.value;
	return chipertext ? JSON.parse(decrypt(chipertext)) : null;
}

export async function getToken() {
	const cookieStore = cookies();
	const authToken = cookieStore.get(AUTH_TOKEN);

	if (authToken) {
		const decryptedToken = decrypt(authToken.value);
		console.log('Token found and decrypted:', decryptedToken);
		return decryptedToken;
	}
	console.error('No auth token found');
	return null;
}

export const removeToken = async () => {
	cookies().delete(SESSION_TOKEN);
	cookies().delete(AUTH_TOKEN);
};
