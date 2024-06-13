import { getUserInfoByToken } from '@/lib/actions/user';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const headerLists = await req.headers;
	const values = await req.json();

	const authToken = headerLists.get('Authorization');
	const token = authToken?.split('Bearer ').at(1);
	console.log('API CREATE TODOS TOKEN - ', token);
	if (!token) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}
	const session = await getUserInfoByToken(token);
	const user = session.user;

	const userExists = await db.user.findUnique({
		where: {
			email: user.email,
		},
	});

	if (!userExists)
		return NextResponse.json(
			{ message: 'User does not exist' },
			{ status: 404 },
		);
	try {
		await db.todos.create({
			userId: userExists.id,
			...values,
		});
		return NextResponse.json({ message: 'Success' }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 },
		);
	}
}
