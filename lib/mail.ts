import EmailTemplate from "@/components/email-templates/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorEmail = async (
	email: string,
	token: string
) => {
	await resend.emails.send({
		from: "Organizer <organizerproject@resend.dev>",
		to: email,
		subject: "Two Factor Authentication",
		html: `<p>Your 2FA code is: <strong>${token}</strong></p>
    <p>For security reasons this code will expire in 5 minutes.</p>`,
	});
};

export const sendForgotPasswordEmail = async (
	email: string,
	token: string
) => {
	const forgotPasswordLink = `${domain}/new-password?token=${token}`;
	await resend.emails.send({
		from: "Organizer <organizerproject@resend.dev>",
		to: email,
		subject: "Reset your password",
		react: EmailTemplate({
			subjectLabel: "Reset your password",
			requiredLink: forgotPasswordLink,
			taskLabel: "Password Reset",
		}) as React.ReactElement,
	});
};

export const sendVerificationEmail = async (
	email: string,
	token: string
) => {
	const confirmLink = `${domain}/new-verification?token=${token}`;

	await resend.emails.send({
		from: "Organizer <organizerproject@resend.dev>",
		to: email,
		subject: "Confirm your Email",
		react: EmailTemplate({
			subjectLabel: "Confirm your Account",
			requiredLink: confirmLink,
			taskLabel: "Account Confirmation",
		}) as React.ReactElement,
	});
};
