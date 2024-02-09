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
		<div className="flex flex-grow flex-col gap-4">
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<div className="flex items-center w-full gap-x-4">
				<Button
					size="lg"
					className="w-full gap-x-2"
					variant="outline"
					onClick={() => onClick("google")}
				>
					<FcGoogle />
					Google
				</Button>
				<Button
					size="lg"
					className="w-full gap-x-2"
					variant="outline"
					onClick={() => onClick("github")}
				>
					<FaGithub />
					Github
				</Button>
			</div>
		</div>
	);
};
