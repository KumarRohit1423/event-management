"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
	{
		name: "Events",
		href: "/events",
	},
	{
		name: "About",
		href: "/about",
	},
	{
		name: "Contact",
		href: "/contact",
	},
];

export default function NavItems() {
	const pathname = usePathname();
	const role = useCurrentRole();
	return (
		<div className="flex gap-3">
			{role === UserRole.ORGANISER ? (
				<div className="flex flex-col">
					<Button
						variant={
							pathname === "/dashboard" ? "default" : "secondary"
						}
					>
						<Link href="/dashboard">Dashboard</Link>
					</Button>
				</div>
			) : (
				<></>
			)}
			{links.map((link) => {
				return (
					<Button
						key={link.name}
						variant={pathname === link.href ? "default" : "ghost"}
					>
						<Link href={link.href}>{link.name}</Link>
					</Button>
				);
			})}
		</div>
	);
}
