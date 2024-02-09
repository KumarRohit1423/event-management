"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { NewPassowrdSchema } from "@/schemas";
import { getForgotPasswordTokenByToken } from "@/data/forgot-password-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const newPassword = async (
	values: z.infer<typeof NewPassowrdSchema>,
	token?: string | null
) => {
	if (!token)
		return {
			error: "Missing token!",
		};

	const validatedFields = NewPassowrdSchema.safeParse(values);
	if (!validatedFields.success)
		return {
			error: "Invalid Fields",
		};
	const { password } = validatedFields.data;
	const existingToken = await getForgotPasswordTokenByToken(token);
	if (!existingToken) {
		return {
			error: "Invalid Token",
		};
	}
	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) {
		return {
			error: "Token has expired",
		};
	}
	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) {
		return {
			error: "Email does not exist",
		};
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	await db.user.update({
		where: {
			id: existingUser.id,
		},
		data: {
			password: hashedPassword,
		},
	});
	await db.forgotPasswordToken.delete({
		where: {
			id: existingToken.id,
		},
	});
	return {
		success: "Password updated successfully",
	};
};
