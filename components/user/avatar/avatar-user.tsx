"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";

export function AvatarUser() {
	const user = useCurrentUser();
	if (!user) return null;
	return (
		<Avatar className="border-2 border-primary">
			<AvatarImage
				src={user?.image ? user.image : ""}
				alt={user.name ? user.name : "user"}
			/>
			<AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
		</Avatar>
	);
}
