import { getToken, removeToken } from '@/lib/actions/auth-actions';
import { NextResponse, type NextRequest } from 'next/server';
import { API_URL } from './data/constants';

export async function middleware(req: NextRequest) {
	const { nextUrl } = req;
	const currentUser = await getToken();

	console.log('MIDDLEWARE > CURRENT_USER - ', currentUser);

	if (currentUser) {
		console.log('CURRENT USER EXECUTE');
		const res = await fetch(`${API_URL}/user`, {
			headers: {
				Authorization: `Bearer ${currentUser}`,
				'content-type': 'application/json',
			},
		});

		if (!res.ok) {
			console.log(
				'Token is invalid or user is not authenticated. Removing token.',
			);
			removeToken();
		}
	}

	if (nextUrl.pathname.startsWith('/api/auth')) {
		return NextResponse.next();
	}

	if (!currentUser && !nextUrl.pathname.startsWith('/auth')) {
		return NextResponse.redirect(new URL('/auth/login', nextUrl));
	}
}

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
