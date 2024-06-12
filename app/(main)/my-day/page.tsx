import { Button } from '@/components/ui/button';
import { getUser } from '@/lib/actions/auth-actions';
import Image from 'next/image';
import { FiPlusCircle } from 'react-icons/fi';
import { ButtonCreateProject } from './_components/button-create-project';

export default async function MyDayPage() {
	const user: UserInfo = await getUser();
	return (
		<div className="flex h-full flex-col items-center justify-center space-y-4">
			<Image
				src="/logo.svg"
				alt="logo"
				height={300}
				width={300}
				className="h-auto w-32 dark:hidden"
			/>
			<Image
				src="/logo-dark.svg"
				alt="logo"
				height={300}
				width={300}
				className="hidden h-auto w-32 dark:block"
			/>
			<h2 className="text-lg font-medium">Welcome {user.name}</h2>
			<ButtonCreateProject />
		</div>
	);
}
