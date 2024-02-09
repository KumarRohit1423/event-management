import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
	.object({
		name: z.optional(z.string()),
		isTwoFactorEnabled: z.optional(z.boolean()),
		role: z.enum([UserRole.ORGANISER, UserRole.USER]),
		email: z.optional(z.string().email()),
		password: z.optional(z.string().min(6)),
		newPassword: z.optional(z.string().min(6)),
	})
	.refine(
		(data) => {
			if (data.password && !data.newPassword) {
				return false;
			}
			return true;
		},
		{
			message: "Password is required!",
			path: ["newPassword"],
		}
	)
	.refine(
		(data) => {
			if (!data.password && data.newPassword) {
				return false;
			}
			return true;
		},
		{
			message: "Password is required!",
			path: ["Password"],
		}
	);

export const NewPassowrdSchema = z
	.object({
		password: z.string().min(6, {
			message: "Password must be greater than 6 characters",
		}),
		passwordConfirm: z.string(),
	})
	.refine(
		(data) => {
			return data.password === data.passwordConfirm;
		},
		{
			message: "Passwords do not match",
			path: ["passwordConfirm"],
		}
	);

export const ForgotPassowrdSchema = z.object({
	email: z.string().email({
		message: "Email is required",
	}),
});

export const LoginSchema = z.object({
	email: z.string().email({
		message: "Invalid Email",
	}),
	password: z.string().min(6, {
		message: "Invalid Password",
	}),
	code: z.optional(z.string()),
});

export const RegisterSchema = z
	.object({
		email: z.string().email({
			message: "Email is required",
		}),
		password: z.string().min(6, {
			message: "Password must be greater than 6 characters",
		}),
		passwordConfirm: z.string(),
		name: z.string().min(1, {
			message: "Name is required",
		}),
		role: z.enum([UserRole.ORGANISER, UserRole.USER]),
	})
	.refine(
		(data) => {
			return data.password === data.passwordConfirm;
		},
		{
			message: "Passwords do not match",
			path: ["passwordConfirm"],
		}
	);
