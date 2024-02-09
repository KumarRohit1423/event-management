"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { redirect } from "next/navigation";

export const register = async (
	values: z.infer<typeof RegisterSchema>
) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: "Something went wrong.Please try again",
		};
	}

	const { email, name, password, role } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);
	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return {
			error: "Email already exists. Login to continue",
		};
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
			role,
		},
	});
	// Implement verification email service.
	const verificationToken = await generateVerificationToken(email);
	await sendVerificationEmail(
		verificationToken.email,
		verificationToken.token
	);
	return {
		success:
			"Account created successfully. Check your inbox for confirmation email",
	};
};
