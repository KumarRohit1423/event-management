"use client";

import { GearIcon } from "@radix-ui/react-icons";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout-button";

export const AvatarPopover = () => {
	const pathname = usePathname();
	const router = useRouter();
	const onClickProfile = () => {
		router.push("/profile");
	};

	return (
		<Popover>
			<PopoverTrigger>
				<Button variant="ghost" size="sm">
					<GearIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent className=" w-auto">
				<div className="w-full flex flex-col gap-2">
					<Button
						onClick={onClickProfile}
						variant={pathname === "/profile" ? "default" : "ghost"}
					>
						Profile
					</Button>
					<LogoutButton>
						<Button variant="ghost">Logout</Button>
					</LogoutButton>
				</div>
			</PopoverContent>
		</Popover>
	);
};
