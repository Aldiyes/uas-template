'use client';

import { BackButton } from '@/components/auth/back-button';
import { Social } from '@/components/auth/social';
import { Logo } from '@/components/logo';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';

type Props = {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
};

export const CardWrapper = ({
	children,
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocial,
}: Props) => {
	return (
		<Card className="w-[400px] shadow-md">
			<CardHeader className="w-full flex flex-col gap-y-4 items-center justify-center">
				<Logo />
				<p className="text-muted-foreground text-sm">{headerLabel}</p>
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	);
};
