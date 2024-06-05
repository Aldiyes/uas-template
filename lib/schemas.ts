import * as z from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(6, {
		message: 'Password must contain at least 6 characters',
	}),
});

export const RegisterSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	password: z.string(),
});
