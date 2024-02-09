"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

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

export const DrawerNavItems = () => {
	const pathname = usePathname();
	const role = useCurrentRole();
	return (
		<>
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
			<div className="flex flex-col gap-4">
				{links.map((link) => {
					return (
						<Button
							key={link.name}
							variant={
								pathname === link.href ? "default" : "secondary"
							}
						>
							<Link href={link.href}>{link.name}</Link>
						</Button>
					);
				})}
			</div>
		</>
	);
};
