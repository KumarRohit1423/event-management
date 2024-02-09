import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { DrawerNavItems } from "@/components/navbar/drawer-nav-items";
import { UserCard } from "@/components/user/user-card";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const NavbarDrawer = async () => {
	const role = await currentRole();
	return (
		<Drawer>
			<DrawerTrigger>
				<Button>
					<HamburgerMenuIcon />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="justify-center gap-2">
				<div className="flex flex-col mx-auto w-full max-w-sm gap-4">
					<DrawerHeader>
						<DrawerTitle>Organizer Menu</DrawerTitle>
						<DrawerDescription>
							Navigate to you destination
						</DrawerDescription>
					</DrawerHeader>
					<DrawerNavItems />
					{/* <div className="h-4"></div> */}
					<UserCard />
				</div>
				<DrawerFooter>
					<DrawerClose className="gap-4">
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
