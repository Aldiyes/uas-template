'use client';

import { RiExpandLeftRightLine } from 'react-icons/ri';

import { LogoutButton } from '@/components/auth/logout-button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/types';

type Props = {
	user: UserInfo;
};

export const UserItem = ({ user }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div
					role="button"
					className="flex w-full items-center p-3 text-sm hover:bg-primary/5"
				>
					<div className="flex max-w-[150px] items-center gap-x-2">
						<Avatar className="h-5 w-5">
							<AvatarImage
								src={typeof user.image === 'string' ? user.image : './logo.svg'}
								className="dark:hidden"
							/>
							<AvatarImage
								src={
									typeof user.image === 'string'
										? user.image
										: './logo-dark.svg'
								}
								className="hidden dark:block"
							/>
						</Avatar>
						<span className="line-clamp-1 text-start font-medium">
							{user.name}&apos;s
						</span>
					</div>
					<RiExpandLeftRightLine className="ml-2 h-4 w-4 rotate-90 text-muted-foreground" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-80"
				align="start"
				alignOffset={11}
				forceMount
			>
				<div className="flex flex-col space-y-4 p-2">
					<p className="text-sm font-medium leading-none text-muted-foreground">
						{user.email}
					</p>
					<div className="flex items-center gap-x-2">
						<div className="rounded-md bg-secondary p-1">
							<Avatar className="h-8 w-8">
								<AvatarImage
									src={
										typeof user.image === 'string' ? user.image : './logo.svg'
									}
									className="dark:hidden"
								/>
								<AvatarImage
									src={
										typeof user.image === 'string'
											? user.image
											: './logo-dark.svg'
									}
									className="hidden dark:block"
								/>
							</Avatar>
						</div>
						<div className="space-y-1">
							<p className="line-clamp-1 text-sm">{user.name}&apos;s</p>
						</div>
					</div>
				</div>
				<div className="my-2 h-[2px] w-full bg-neutral-200 dark:bg-neutral-600" />
				<DropdownMenuItem
					asChild
					className="w-full cursor-pointer text-muted-foreground"
				>
					<LogoutButton redirect="/" asChild>
						<Button className="w-full">Logout</Button>
					</LogoutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
