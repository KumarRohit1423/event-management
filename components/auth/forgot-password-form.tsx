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
import { ForgotPassowrdSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-messages/form-error";
import { FormSuccess } from "@/components/form-messages/form-success";
import { forgotPassword } from "@/actions/forgot-password";
import { ReloadIcon } from "@radix-ui/react-icons";

export const ForgotPasswordForm = () => {
	const form = useForm<z.infer<typeof ForgotPassowrdSchema>>({
		resolver: zodResolver(ForgotPassowrdSchema),
		defaultValues: {
			email: "",
		},
	});

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const onSubmit = (values: z.infer<typeof ForgotPassowrdSchema>) => {
		setError("");
		setSuccess("");
		startTransition(() => {
			forgotPassword(values).then((data) => {
				setError(data?.error);
				// TODO Comes with 2FA
				setSuccess(data?.success);
			});
		});
	};
	return (
		<CardWrapper
			backButtonText="Back to login"
			headerLabel="Forgot your Password?"
			backButtonLabel="Sign in"
			backButtonHref="/auth/login"
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
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
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormSuccess message={success} />
						<FormError message={error} />
						{isPending ? (
							<Button disabled={isPending} className="w-full">
								<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
								Please wait
							</Button>
						) : (
							<Button type="submit" className="w-full">
								Send Reset Link
							</Button>
						)}
					</div>
				</form>
			</Form>
		</CardWrapper>
	);
};
