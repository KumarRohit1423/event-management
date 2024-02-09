"use client";

import {
	Card,
	CardTitle,
	CardHeader,
	CardContent,
	CardDescription,
} from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AvatarUser } from "@/components/user/avatar/avatar-user";
import { AvatarPopover } from "@/components/user/avatar/avatar-popover";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export const UserCard = () => {
	const user = useCurrentUser();
	if (!user) {
		return (
			<div className="flex items-center justify-between border-2 p-4 rounded-md">
				<div className="flex flex-col gap-2">
					<p className="text-md font-semibold leading-none">
						Account Settings
					</p>
					<p className="text-sm text-muted-foreground">
						Login to continue
					</p>
				</div>
				<LoginButton>
					<Button>Sign In</Button>
				</LoginButton>
			</div>
		);
	}
	return (
		<Card>
			<CardContent className="py-4">
				<div className="flex items-center justify-between space-x-4 rounded-md">
					<AvatarUser />
					<div>
						<p className="text-sm font-medium leading-none">
							{user.name}
						</p>
						<p className="text-sm truncate max-w-[180px] text-muted-foreground">
							{user.email}
						</p>
					</div>
					<AvatarPopover />
				</div>
			</CardContent>
		</Card>
	);
};
