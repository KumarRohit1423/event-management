"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AvatarUser } from "@/components/user/avatar/avatar-user";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout-button";

export const AvatarDropdown = () => {
	const user = useCurrentUser();
	const router = useRouter();
	const onClickProfile = () => {
		router.push("/profile");
	};
	const onClickSettings = () => {
		router.push("/settings");
	};
	if (!user) return null;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<AvatarUser />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-lg" align="end">
				<DropdownMenuLabel className="text-center">
					My Account
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Button onClick={onClickProfile} variant="ghost">
							Profile
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Button onClick={onClickSettings} variant="ghost">
							Settings
						</Button>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<LogoutButton>
							<Button variant="ghost">Logout</Button>
						</LogoutButton>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
