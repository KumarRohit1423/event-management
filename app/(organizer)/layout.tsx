import { Navbar } from "@/components/navbar/navbar";

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen flex flex-col gap-2 bg-primary-foreground">
			<Navbar />
			<div className="p-4">{children}</div>
		</div>
	);
}
