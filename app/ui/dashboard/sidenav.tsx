import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import LogoDev from "@mui/icons-material/LogoDev";
import Logout from "@mui/icons-material/Logout";
import TitleText from "@/app/ui/dashboard/title-text";
import { signOut } from "@/auth";

export default function SideNav() {
	return (
		<div className="flex h-full flex-col px-3 py-4 md:px-2">
			<Link
				className="mb-2 flex h-20 items-end justify-start rounded-md bg-purple-500 p-4 md:h-20"
				href="/"
			>
				<div className="w-32 h-10 flex flex-1 items-center justify-between text-white md:w-20 md:h-10 ">
					<TitleText />
					<LogoDev className="md:hidden" />
				</div>
			</Link>
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
				<NavLinks />
				<div className="hidden h-auto w-full grow rounded-m md:block"></div>
				<form
					action={async () => {
						"use server";
						await signOut();
					}}
				>
					<button className="flex h-[48px] grow items-center justify-center gap-2 rounded-2xl bg-gray-50 p-3 text-sm font-medium hover:scale-105 transition-transform ease-in-out duration-200 hover:outline hover:outline-1 hover:bg-purple-100 hover:text-purple-500 md:flex-none md:justify-start md:p-2 md:px-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
						<Logout className="w-6" />
						<div className="hidden md:block">Sign Out</div>
					</button>
				</form>
			</div>
		</div>
	);
}
