"use server";

import * as z from "zod";

import { ForgotPassowrdSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendForgotPasswordEmail } from "@/lib/mail";
import { generateForgotPasswordToken } from "@/lib/tokens";

export const forgotPassword = async (
	values: z.infer<typeof ForgotPassowrdSchema>
) => {
	const validatedFields = ForgotPassowrdSchema.safeParse(values);
	if (!validatedFields.success) {
		return {
			error: "Invalid email!",
		};
	}
	const { email } = validatedFields.data;
	const existingUser = await getUserByEmail(email);
	if (!existingUser) {
		return {
			error: "Email not found!",
		};
	}
	// TODO: Generate reset token and send email
	const forgotPasswordToken = await generateForgotPasswordToken(
		email
	);
	await sendForgotPasswordEmail(
		forgotPasswordToken.email,
		forgotPasswordToken.token
	);
	return {
		success: "Reset link sent!",
	};
};
