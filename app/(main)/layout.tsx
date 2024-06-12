import { getUser } from "@/lib/actions/auth-actions";
import { Navigation } from "./_components/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <div className="flex h-full dark:bg-neutral-900">
      <Navigation userInfo={user} />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
