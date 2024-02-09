import type { Metadata } from "next";
import React from "react";
import { inter } from "@/lib/fonts";
import "@/app/ui/global.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Organizer",
	description: "Next generation Event Management Platform",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html lang="en">
				<body className={cn("h-screen", inter.className)}>
					<Toaster />
					{children}
				</body>
			</html>
		</SessionProvider>
	);
}
