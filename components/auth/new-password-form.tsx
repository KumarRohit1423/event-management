"use client";

import { useState, useTransition } from "react";
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
import { NewPassowrdSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-messages/form-error";
import { FormSuccess } from "@/components/form-messages/form-success";
import { ReloadIcon } from "@radix-ui/react-icons";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

export const NewPasswordForm = () => {
	const form = useForm<z.infer<typeof NewPassowrdSchema>>({
		resolver: zodResolver(NewPassowrdSchema),
		defaultValues: {
			password: "",
		},
	});

	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const onSubmit = (values: z.infer<typeof NewPassowrdSchema>) => {
		setError("");
		setSuccess("");
		startTransition(() => {
			newPassword(values, token).then((data) => {
				setError(data?.error);
				// TODO Comes with 2FA
				setSuccess(data?.success);
			});
		});
	};
	return (
		<CardWrapper
			headerLabel="Enter your new Password"
			backButtonLabel="Back to login"
			backButtonHref="/auth/login"
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
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
									{/*<FormDescription>Enter your password here</FormDescription>*/}
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="passwordConfirm"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
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
									{/*<FormDescription>Confirm your password here</FormDescription>*/}
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormSuccess message={success} />
						<FormError message={error} />
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
								<>Update Password</>
							)}
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	);
};
