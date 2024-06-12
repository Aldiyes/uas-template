'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/lib/actions/auth-actions';
import { useRouter } from 'next/navigation';

type Props = {
	redirect: string;
	children: React.ReactNode;
	asChild?: boolean;
};

export const LogoutButton = ({
	redirect,
	children,
	asChild = false,
}: Props) => {
	const router = useRouter();
	const onLogout = async () => {
		await logout();
		router.push(redirect);
	};
	return (
		<Button onClick={onLogout} asChild={asChild}>
			{children}
		</Button>
	);
};
