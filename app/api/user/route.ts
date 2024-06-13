import { verify } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const headerLists = await req.headers;

	const authToken = headerLists.get('Authorization');
	console.log('[API > USER > AUTH_TOKEN] - ', authToken);
	const token = authToken?.split('Bearer ').at(1);
	console.log('[API > USER > TOKEN] - ', token);
	if (!token) {
		console.log(
			'laksjfdlkasjflkasjflksajflksajflkasjflksajflksajfklsajflkasjflkasj',
		);
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	const secret = process.env.JWT_SECRET || '';

	try {
		const verifyToken = verify(token, secret);
		console.log('[API > USER > VERIFY_TOKEN] - ', verifyToken);
		return NextResponse.json({ user: verifyToken }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 },
		);
	}
}
