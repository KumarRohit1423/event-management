"use client";

import { roboto } from "@/app/ui/fonts";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Button } from "./button";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import Link from "next/link";

export default function LoginForm() {
	const [state, dispatch] = useFormState(authenticate, undefined);
	return (
		<form action={dispatch} className="">
			<div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
				<h1 className={`${roboto.className} mb-3 text-2xl`}>
					Please log in to continue.
				</h1>
				<div className="w-full">
					<div>
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
								type="password"
								name="password"
								placeholder="Enter password"
								required
								minLength={6}
							/>
							<KeyOutlinedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex-1">
						<LoginButton />
					</div>
					<div>
						<Link href="/signup">
							<Button className="ml-4 mt-8 hover:bg-purple-300 hover:text-purple-900">
								Signup
								<DoubleArrowIcon className="ml-2 h-5 w-5 text-gray-50" />
							</Button>
						</Link>
					</div>
				</div>
				{/* <LoginButton /> */}
				{/* <div className="flex h-4 items-end space-x-1"> */}
				{/* Add form errors here */}
				{/* </div> */}
				<div
					className="flex h-8 items-end space-x-1"
					aria-live="polite"
					aria-atomic="true"
				>
					{state === "CredentialsSignin" && (
						<>
							<GppMaybeOutlinedIcon className="h-5 w-5 text-red-500" />
							<p className="text-sm text-red-500">
								Invalid credentials
							</p>
						</>
					)}
				</div>
			</div>
		</form>
	);
}

function LoginButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			className="mt-8 hover:bg-purple-300 hover:text-purple-900 flex justify-center"
			aria-disabled={pending}
		>
			Login
			<DoubleArrowIcon className="ml-2 h-5 w-5 text-gray-50" />
		</Button>
	);
}