import { Navbar } from "@/components/navbar/navbar";

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-full flex flex-col gap-2 bg-primary-foreground">
			<Navbar />
			<div className="h-screen p-4">{children}</div>
		</div>
	);
}
