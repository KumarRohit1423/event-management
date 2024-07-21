"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormDescription,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FormError } from "@/components/form-messages/form-error";
import { FormSuccess } from "@/components/form-messages/form-success";
import { login } from "@/actions/login";
import Link from "next/link";

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? "Email already in use with different provider!"
			: "";
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
			code: undefined,
		},
	});
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [showPassword, setShowPassword] = useState(false);
	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			login(values, callbackUrl)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data.error);
					}
					if (data?.success) {
						form.reset();
						setSuccess(data.success);
					}
					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => setError("Something went wrong!"));
		});
	};
	return (
		<CardWrapper
			headerLabel="Welcome Back"
			backButtonText="Don’t have an account?"
			backButtonLabel="Sign Up.."
			backButtonHref="/auth/register"
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
						{showTwoFactor && (
							<FormField
								name="code"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Two Factor Code</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder="123456"
											/>
										</FormControl>
										{/*<FormDescription>Enter 2FA code</FormDescription>*/}
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{!showTwoFactor && (
							<>
								<FormField
									name="email"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={isPending}
													placeholder="yujiItadori@sukunamail.com"
													type="email"
													required
												/>
											</FormControl>
											{/*<FormDescription>Enter your email here</FormDescription>*/}
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name="password"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														{...field}
														disabled={isPending}
														placeholder={
															showPassword ? "pass@123" : "******"
														}
														type={showPassword ? "text" : "password"}
														required
													/>
													<div
														className="absolute inset-y-0 right-0 pr-3
                        flex items-center text-gray-400 cursor-pointer"
													>
														{showPassword ? (
															<HiEye
																className="h-4 w-4"
																onClick={togglePasswordVisibility}
															/>
														) : (
															<HiEyeOff
																className="h-4 w-4"
																onClick={togglePasswordVisibility}
															/>
														)}
													</div>
												</div>
											</FormControl>
											<Button
												size="sm"
												variant="link"
												asChild
												className="px-0 font-normal"
											>
												<Link href="/auth/forgot-password">
													Forgot Password?
												</Link>
											</Button>
											{/*<FormDescription>Enter your password here</FormDescription>*/}
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
						<FormSuccess message={success} />
						<FormError message={error || urlError} />
						<Button
							disabled={isPending}
							className="w-full"
							type="submit"
						>
							{isPending ? (
								<>
									<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
									Please Wait
								</>
							) : (
								<>{showTwoFactor ? "Confirm" : "Login"}</>
							)}
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	);
};
