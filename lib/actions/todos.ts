'use server';

import { API_URL, AUTH_TOKEN } from '@/data/constants';
import { cookies } from 'next/headers';
import { getToken } from './auth-actions';

export const createProject = async (values: any) => {
	const cookieStore = cookies();
	const token = cookieStore.get(AUTH_TOKEN)?.value;

	console.log('CREATE PROJECT: ', token);

	if (!token) return { message: 'Invalid token' };

	const res = await fetch(`${API_URL}/todos`, {
		method: 'POST',
		body: JSON.stringify(values),
		headers: {
			Authorization: `Bearer ${await getToken()}`,
		},
	});

	if (!res.ok) return { message: `Error with status code: ${res.status}` };

	const data = await res.json();
	return data;
};
