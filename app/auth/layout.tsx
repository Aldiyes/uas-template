export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-full flex items-center justify-center dark:bg-[#1F1F1F]">
			{children}
		</div>
	);
}
