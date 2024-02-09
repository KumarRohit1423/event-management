import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavItems from "@/components/navbar/nav-items";
import { currentUser } from "@/lib/auth";
import { LoginButton } from "@/components/auth/login-button";
import { AvatarDropdown } from "@/components/user/avatar/avatar-dropdown";
import { NavbarDrawer } from "@/components/navbar/navbar-drawer";
import { DrawerNavItems } from "@/components/navbar/drawer-nav-items";

export const Navbar = async () => {
	const user = await currentUser();
	return (
		<nav className="h-20 w-full flex items-center p-6 bg-primary-foreground justify-between shadow-lg sticky top-0">
			<Link
				className={cn(
					"text-center text-4xl drop-shadow-md text-primary font-bold",
					inter.className
				)}
				href="/events"
			>
				Organizer
			</Link>
			<div className="hidden gap-4 items-center justify-between md:flex">
				<NavItems />
				{!user ? (
					<LoginButton>
						<Button variant="outline">Sign In</Button>
					</LoginButton>
				) : (
					<AvatarDropdown />
				)}
			</div>
			<div className="md:hidden">
				<NavbarDrawer />
			</div>
		</nav>
	);
};
