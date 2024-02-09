"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
	{
		name: "Dashboard",
		href: "/dashboard",
	},
	{
		name: "Events",
		href: "/events",
	},
	{
		name: "About",
		href: "/about",
	},
	{
		name: "Contact Us",
		href: "/contact",
	},
];

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<div className="flex justify-between">
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
