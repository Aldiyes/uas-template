import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';

const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(req: NextRequest) {
	const { email, password } = await req.json();

	const userExists = await db.user.findUnique({
		where: {
			email,
		},
	});

	if (!userExists || !userExists.password) {
		return NextResponse.json(
			{ error: 'Email does not exists' },
			{ status: 401 },
		);
	}

	const passwordMatch = await compare(password, userExists.password);
	if (!passwordMatch) {
		return NextResponse.json(
			{ error: 'Password does not match' },
			{ status: 401 },
		);
	}

	const secret = process.env.JWT_SECRET || '';

	console.log('[API > LOGIN > SECRET] - ', secret);

	const storeData = {
		id: userExists.id,
		name: userExists.name,
		email: userExists.email,
		image: userExists.image,
		role: userExists.role,
	};

	const token = sign({ storeData }, secret, { expiresIn: MAX_AGE });

	return NextResponse.json(
		{ token: token, user: userExists, success: 'Authenticated' },
		{
			status: 200,
		},
	);
}
