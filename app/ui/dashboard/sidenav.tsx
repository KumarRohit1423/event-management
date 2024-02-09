import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function DesktopSideNav() {
	// const onClick = () => {
	// 	logout();
	// };
	return (
		<div className="flex h-full flex-col px-3 py-4 lg:px-2">
			<Link
				className="mb-2 flex h-20 items-end justify-start rounded-md bg-purple-500 p-4 lg:h-20"
				href="/"
			>
				<div className="w-32 h-10 flex flex-1 items-center justify-between text-white lg:w-20 lg:h-10 ">
					Organizer
				</div>
			</Link>
			<div className="flex grow flex-row justify-between space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
				<NavLinks />
				<div className="h-auto w-full grow rounded-m"></div>
				<form
					action={async () => {
						"use server";
						await signOut();
					}}
				>
					<Button variant="default">Sign Out</Button>
				</form>
			</div>
		</div>
	);
}
