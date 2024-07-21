"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormItem,
	FormField,
	FormMessage,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingsSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { settings } from "@/actions/settings";
import { FormError } from "@/components/form-messages/form-error";
import { FormSuccess } from "@/components/form-messages/form-success";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { HiEye, HiEyeOff } from "react-icons/hi";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";

export const UpdateForm = ({
	className,
}: React.ComponentProps<"form">) => {
	const user = useCurrentUser();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const { update } = useSession();
	const [isPending, startTransition] = useTransition();
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const form = useForm<z.infer<typeof SettingsSchema>>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			name: user?.name || undefined,
			email: user?.email || undefined,
			password: undefined,
			newPassword: undefined,
			isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
			role: user?.role || undefined,
		},
	});
	const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
		startTransition(() => {
			settings(values)
				.then((data) => {
					if (data.error) {
						setError(data.error);
					}
					if (data.success) {
						update();
						setSuccess(data.success);
					}
				})
				.catch(() => {
					setError("Something went wrong!");
				});
		});
	};
	return (
		<Form {...form}>
			<form
				className={cn("flex flex-col space-y-6", className)}
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							{/* <FormDescription>Enter your new name</FormDescription> */}
							<FormControl>
								<Input
									{...field}
									placeholder="Yuji Itadori"
									disabled={isPending}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				{user?.isOAuth === false && (
					<>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									{/* <FormDescription>Enter your new email</FormDescription> */}
									<FormControl>
										<Input
											{...field}
											placeholder="itadoriyuji@sukunamail.com"
											disabled={isPending}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									{/* <FormDescription>
								Enter your current password here
							</FormDescription> */}
									<div className="relative">
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder={
													showPassword ? "pass@123" : "******"
												}
												type={showPassword ? "text" : "password"}
											/>
										</FormControl>
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
									{/* <FormMessage /> */}
								</FormItem>
							)}
						/>
						<FormField
							name="newPassword"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
									{/* <FormDescription>
								Enter your new password here
							</FormDescription> */}
									<div className="relative">
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder={
													showPassword ? "pass@123" : "******"
												}
												type={showPassword ? "text" : "password"}
											/>
										</FormControl>
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
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				)}
				<FormField
					name="role"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							{/* <FormDescription>Enter your new role</FormDescription> */}
							<Select
								disabled={isPending}
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Roles</SelectLabel>
										<SelectItem value={UserRole.ORGANISER}>
											ORGANISER
										</SelectItem>
										<SelectItem value={UserRole.USER}>
											PARTICIPANT
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				{user?.isOAuth === false && (
					<FormField
						control={form.control}
						name="isTwoFactorEnabled"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
								<div className="space-y-0.5">
									<FormLabel>Two-Factor Authentication</FormLabel>
									<FormDescription>
										Enable or disable two-factor authentication
									</FormDescription>
								</div>
								<FormControl>
									<Switch
										checked={field.value}
										onChange={field.onChange}
										disabled={isPending}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				)}
				<FormError message={error} />
				<FormSuccess message={success} />
				<Button disabled={isPending} type="submit">
					{isPending ? (
						<>
							<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
							Please wait
						</>
					) : (
						<>Update</>
					)}
				</Button>
			</form>
		</Form>
	);
};
