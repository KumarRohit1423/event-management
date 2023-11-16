"use client";

import HomeIcon from "@mui/icons-material/Home";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventOverIcon from "@mui/icons-material/EventBusy";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
	{
		name: "Home",
		href: "/landing",
		icon: HomeIcon,
	},
	{
		name: "Upcoming Events",
		href: "/landing/upcomingEvents",
		icon: EventAvailableIcon,
	},
	{
		name: "Past Events",
		href: "/landing/pastEvents",
		icon: EventOverIcon,
	},
	{
		name: "Organizers",
		href: "/landing/organizers",
		icon: PeopleIcon,
	},
];

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon;
				return (
					<Link
						key={link.name}
						href={link.href}
						className={clsx(
							"flex h-[48px] grow items-center justify-center gap-2 rounded-md hover:outline hover:outline-1 bg-gray-100 p-3 text-sm font-medium hover:bg-purple-100 hover:text-purple-500 md:flex-none md:justify-start md:p-2 md:px-3",
							{
								"bg-purple-200 text-purple-500":
									pathname === link.href,
							}
						)}
					>
						<LinkIcon className="w-8" />
						<p className="hidden md:block">{link.name}</p>
					</Link>
				);
			})}
		</>
	);
}
