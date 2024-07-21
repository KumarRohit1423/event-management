"use client";

import { ExtendedUser } from "@/types/next-auth";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import FallbackUserImage from "@/public/fallback/user-image.png";
import { DynamicFormWrapper } from "@/components/dynamic-form-wrapper";
import { UpdateForm } from "@/app/(organizer)/profile/_components/update-form";
import { Button } from "@/components/ui/button";

interface UserInfoProps {
	user?: ExtendedUser;
	label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
	return (
		<Card>
			<CardHeader className="flex-row justify-between">
				<p
					className={cn(
						"text-2xl font-semibold text-center",
						inter.className
					)}
				>
					{label}
				</p>
				<Button size="icon">
					<DynamicFormWrapper
						headerTitle="Update Profile"
						headerDescription="Modify or Update your Profile"
					>
						<UpdateForm className="px-4" />
					</DynamicFormWrapper>
				</Button>
			</CardHeader>
			<CardContent className="mx-auto justify-center space-y-4 md:flex md:mx-0 md:items-center md:justify-around md:gap-16">
				<div className="md:flex md:justify-end md:max-w-lg">
					<Image
						src={user?.image ? user.image : FallbackUserImage}
						alt="user-image"
						width={240}
						height={180}
						loading="lazy"
						className="border-primary border-2 mx-auto md:my-auto"
					/>
				</div>
				<div className="flex flex-col gap-4 md:flex-grow md:max-w-3xl">
					<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
						<p className="text-sm font-semibold">ID</p>
						<p className="truncate text-md max-w-[240px] font-mono p-1 rounded-md">
							{user?.id}
						</p>
					</div>
					<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
						<p className="text-sm font-semibold">Name</p>
						<p className="truncate text-md max-w-[240px] font-mono p-1 rounded-md">
							{user?.name}
						</p>
					</div>
					<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
						<p className="text-sm font-semibold">Email</p>
						<p className="truncate text-md max-w-[280px] font-mono p-1 rounded-md">
							{user?.email}
						</p>
					</div>
					<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
						<p className="text-sm font-semibold">Role</p>
						<p className="truncate text-md max-w-[180px] font-mono p-1 rounded-md">
							{user?.role}
						</p>
					</div>
					<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
						<p className="text-sm font-medium">Two Factor Status</p>
						<Badge
							variant={
								user?.isTwoFactorEnabled ? "success" : "destructive"
							}
						>
							{user?.isTwoFactorEnabled ? "Enabled" : "Disabled"}
						</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
