"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
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
import { RegisterSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FormError } from "@/components/form-messages/form-error";
import { FormSuccess } from "@/components/form-messages/form-success";
import { register } from "@/actions/register";
import {
	RadioGroup,
	RadioGroupItem,
} from "@/components/ui/radio-group";
import { UserRole } from "@prisma/client";

export const RegisterForm = () => {
	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
			role: UserRole.USER,
		},
	});

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError("");
		setSuccess("");
		startTransition(() => {
			register(values).then((data) => {
				setError(data.error);
				setSuccess(data.success);
			});
		});
	};
	return (
		<CardWrapper
			headerLabel="Create an Account"
			backButtonText="Already have an account?"
			backButtonLabel="Sign In.."
			backButtonHref="/auth/login"
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4"
				>
					<div className="space-y-4">
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="Itadori Yuji"
											type="text"
											required
										/>
									</FormControl>
									{/*<FormDescription>Enter your name here</FormDescription>*/}
									<FormMessage />
								</FormItem>
							)}
						/>
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
									{/* <FormDescription>
										Enter your password here
									</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <FormField
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
									<FormMessage />
								</FormItem>
							)}
						/> */}
						<FormField
							name="role"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>
									<FormControl>
										<RadioGroup
											disabled={isPending}
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex flex-row gap-10"
											required
										>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value={UserRole.USER} />
												</FormControl>
												<FormLabel className="font-normal">
													Participant
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem
														value={UserRole.ORGANISER}
													/>
												</FormControl>
												<FormLabel className="font-normal">
													Organizer
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									{/* <FormDescription>
										Enter your name here
									</FormDescription> */}
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
									Please wait
								</>
							) : (
								<>Register</>
							)}
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	);
};
