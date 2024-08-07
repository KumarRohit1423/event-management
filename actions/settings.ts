"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { revalidatePath } from "next/cache";

export const settings = async (
	values: z.infer<typeof SettingsSchema>
) => {
	const user = await currentUser();
	if (!user) {
		return {
			error: "Unauthorized Access detected",
		};
	}
	const dbUser = await getUserById(user.id);
	if (!dbUser) {
		return {
			error: "Unauthorized Access detected",
		};
	}
	if (user.isOAuth) {
		values.email = undefined;
		values.password = undefined;
		values.newPassword = undefined;
		values.isTwoFactorEnabled = undefined;
	}
	if (values.email && values.email !== user.email) {
		const existingUser = await getUserByEmail(values.email);
		if (existingUser && existingUser.id !== user.id) {
			return {
				error: "Email already in use!",
			};
		}
		const verificationToken = await generateVerificationToken(
			values.email
		);
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);
		return {
			success:
				"Verification email sent! Please check your inbox and verify your email address to continue",
		};
	}
	if (values.password && values.newPassword && dbUser.password) {
		const passwordMatch = await bcrypt.compare(
			values.password,
			dbUser.password
		);
		if (!passwordMatch) {
			return {
				error: "Current Password is Incorrect",
			};
		}
		const hashedPassword = await bcrypt.hash(values.newPassword, 10);
		values.password = hashedPassword;
		values.newPassword = undefined;
	}

	await db.user.update({
		where: { id: dbUser.id },
		data: {
			...values,
		},
	});
	revalidatePath("/profile");
	return {
		success: "Settings updated successfully",
	};
};
