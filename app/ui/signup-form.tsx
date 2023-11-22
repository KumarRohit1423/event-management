"use client";

import { roboto } from "@/app/ui/fonts";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"; // Assuming a person icon for username
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Button } from "./button";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { redirect } from "next/navigation";
import { signup } from "@/app/lib/actions"; // Assuming a signup action

export default function SignupForm() {
	const [state, dispatch] = useFormState(signup, undefined);

	const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};
	return (
		<form action={dispatch} className="">
			<div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
				<h1 className={`${roboto.className} mb-3 text-2xl`}>
					Create an account
				</h1>
				<div className="w-full">
					<div>
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="username"
						>
							Name
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="username"
								type="text"
								name="username"
								placeholder="Enter your full name"
								required
							/>
							<PersonOutlineIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div className="mt-4">
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="email"
						>
							Email
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="email"
								type="email"
								name="email"
								placeholder="Enter your email address"
								required
							/>
							<AlternateEmailOutlinedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div className="mt-4">
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="password"
						>
							Password
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="password"
								type={showPassword ? "text" : "password"}
								name="password"
								placeholder="Enter password"
								required
								minLength={6}
							/>
							<KeyOutlinedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
							<button
								type="button"
								onClick={togglePasswordVisibility}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
							>
								{showPassword ? (
									<VisibilityOffOutlinedIcon />
								) : (
									<VisibilityOutlinedIcon />
								)}
							</button>
						</div>
					</div>
				</div>
				<div className="mt-4">
					<label className="block text-xs font-medium text-gray-900 mb-2">
						Role
					</label>
					<div className="flex items-center space-x-4">
						<label htmlFor="user" className="flex items-center">
							<input
								type="radio"
								id="user"
								name="role"
								value="user"
								className="mr-1"
								// Add required attributes or any other necessary properties
							/>
							User
						</label>
						<label htmlFor="organizer" className="flex items-center">
							<input
								type="radio"
								id="organizer"
								name="role"
								value="organizer"
								className="mr-1"
								// Add required attributes or any other necessary properties
							/>
							Organizer
						</label>
					</div>
				</div>
				<SignupButton />
				{/* <div className="flex h-4 items-end space-x-1"> */}
				{/* Add form errors here */}
				{/* </div> */}
				<div
					className="flex h-12 items-end space-x-1"
					aria-live="polite"
					aria-atomic="true"
				>
					{state === "SignupFailure" ? (
						<>
							<GppMaybeOutlinedIcon className="h-5 w-5 text-red-500" />
							<p className="text-sm text-red-500">
								Failed to create an account. Please try again.
							</p>
						</>
					) : state === "SignupSuccessful" ? (
						<>
							<CheckCircleOutlineOutlinedIcon className="h-5 w-5 text-green-500" />
							<p className="text-sm text-green-500">
								Account created successfully.
								{redirect("/login")}
							</p>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</form>
	);
}

function SignupButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			className="mt-8 w-full hover:bg-purple-300 hover:text-purple-900 flex justify-center"
			aria-disabled={pending}
		>
			Sign Up
			<DoubleArrowIcon className="ml-auto h-5 w-5 text-gray-50" />
		</Button>
	);
}
