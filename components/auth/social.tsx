"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export const Social = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");
	const onClick = (provider: "google" | "github") => {
		signIn(provider, {
			callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
		});
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-center w-full gap-x-8">
				<Button
					size="lg"
					className="w-auto gap-x-4"
					variant="outline"
					onClick={() => onClick("google")}
				>
					<FcGoogle className="size-4" />
					<p className="text-muted-foreground">Google</p>
				</Button>
				<Button
					size="lg"
					className="w-auto gap-x-4"
					variant="outline"
					onClick={() => onClick("github")}
				>
					<FaGithub className="size-4" />
					<p className="text-muted-foreground">GitHub</p>
				</Button>
			</div>
			<div className="flex items-center justify-center">
				<div className="w-full border-t-2 px-2"></div>
				<p className="text-muted-foreground px-4">or</p>
				<div className="w-full border-t-2 px-2"></div>
			</div>
		</div>
	);
};
