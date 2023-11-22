import type { Metadata } from "next";
import { roboto } from "@/app/ui/fonts";
import "@/app/ui/global.css";

export const metadata: Metadata = {
	title: "Organizzer",
	description: "Next generation Event Management Platform",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${roboto.className} antialiased`}>
				{children}
			</body>
		</html>
	);
}
