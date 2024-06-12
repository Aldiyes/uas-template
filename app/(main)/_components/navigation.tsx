'use client';

import { usePathname } from 'next/navigation';
import React, { ElementRef, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { GiHamburgerMenu } from 'react-icons/gi';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

import { cn } from '@/lib/utils';
import { UserInfo } from '@/types';
import { UserItem } from './user-item';

type Props = {
	userInfo: UserInfo;
};

export const Navigation = ({ userInfo }: Props) => {
	const pathname = usePathname();
	const isMobile = useMediaQuery('(max-width: 768px)');

	useEffect(() => {
		if (isMobile) {
			collapse();
		} else {
			resetWidth();
		}
	}, [isMobile]);

	useEffect(() => {
		if (isMobile) {
			collapse();
		}
	}, [pathname, isMobile]);

	const isResizingRef = useRef(false);
	const sidebarRef = useRef<ElementRef<'aside'>>(null);
	const navbarRef = useRef<ElementRef<'div'>>(null);
	const [isResetting, setIsResetting] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(isMobile);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();

		isResizingRef.current = true;
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!isResizingRef.current) return;
		let newWidth = e.clientX;

		if (newWidth < 240) newWidth = 240;
		if (newWidth > 480) newWidth = 480;

		if (sidebarRef.current && navbarRef.current) {
			sidebarRef.current.style.width = `${newWidth}px`;
			navbarRef.current.style.setProperty('left', `${newWidth}px`);
			navbarRef.current.style.setProperty(
				'width',
				`calc(100% - ${newWidth}px)`,
			);
		}
	};

	const handleMouseUp = () => {
		isResizingRef.current = false;
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	const resetWidth = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(false);
			setIsResetting(true);

			sidebarRef.current.style.width = isMobile ? '100%' : '240PX';
			navbarRef.current.style.setProperty(
				'width',
				isMobile ? '0' : 'calc(100% - 240px)',
			);
			navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');

			setTimeout(() => setIsResetting(false), 300);
		}
	};

	const collapse = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(true);
			setIsResetting(true);

			sidebarRef.current.style.width = '0';
			navbarRef.current.style.setProperty('width', '100%');
			navbarRef.current.style.setProperty('left', '0');

			setTimeout(() => setIsResetting(false), 300);
		}
	};

	return (
		<>
			<aside
				ref={sidebarRef}
				className={cn(
					'group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-secondary',
					isResetting && 'transition-all duration-300 ease-in-out',
					isMobile && 'w-0',
				)}
			>
				<div
					role="button"
					onClick={collapse}
					className={cn(
						'absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600',
						isMobile && 'opacity-100',
					)}
				>
					<MdKeyboardDoubleArrowLeft className="h-6 w-6" />
				</div>
				<div>
					<UserItem user={userInfo} />
				</div>
				<div className="mt-4">
					<p>Documents</p>
				</div>
				<div
					onMouseDown={handleMouseDown}
					onClick={resetWidth}
					className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-neutral-200 opacity-0 transition group-hover/sidebar:opacity-100 dark:bg-neutral-600"
				/>
			</aside>
			<div
				ref={navbarRef}
				className={cn(
					'absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]',
					isResetting && 'transition-all duration-300 ease-in-out',
					isMobile && 'left-0 w-full',
				)}
			>
				<nav className="w-full bg-transparent px-3 py-2">
					{isCollapsed && (
						<GiHamburgerMenu
							role="button"
							onClick={resetWidth}
							className="h-6 w-6 text-muted-foreground"
						/>
					)}
				</nav>
			</div>
		</>
	);
};
