'use server';

import { API_URL } from "@/data/constants";

export const getUserInfoByToken = async (token: string) => {
	const res = await fetch(`${API_URL}/user`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) return null;

	const response = await res.json();

	return response;
};
