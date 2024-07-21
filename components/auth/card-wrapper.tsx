"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardFooter,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonText: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
}

export const CardWrapper = ({
	children,
	headerLabel,
	backButtonText,
	backButtonLabel,
	backButtonHref,
	showSocial,
}: CardWrapperProps) => {
	return (
		<Card className="min-w-[400px] sm:min-w-[500px] lg:min-w-[600px] shadow-xl">
			{/*<Card className="object-contain min-w-[400px] sm:min-w-[500px] lg:min-w-[600px] shadow-xl">*/}
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			{showSocial && (
				<CardContent>
					<Social />
				</CardContent>
			)}
			<CardContent>{children}</CardContent>
			<CardFooter className="justify-center">
				<p className="text-sm text-muted-foreground">
					{backButtonText}
				</p>
				<BackButton href={backButtonHref} label={backButtonLabel} />
			</CardFooter>
		</Card>
	);
};
