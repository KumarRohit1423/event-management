import NextAuth from "next-auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getAccountByUserId } from "@/data/account";
import authConfig from "@/auth.config";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			});
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== "credentials") return true;
			const existingUser = await getUserById(user.id);
			if (!existingUser?.emailVerified) return false;
			if (existingUser.isTwoFactorEnabled) {
				const twoFactorConfirmation =
					await getTwoFactorConfirmationByUserId(existingUser.id);
				if (!twoFactorConfirmation) return false;
				await db.twoFactorConfirmation.delete({
					where: {
						id: twoFactorConfirmation.id,
					},
				});
			}
			return true;
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			if (token.role && session.user) {
				session.user.role = token.role as UserRole;
			}
			if (session.user) {
				session.user.isTwoFactorEnabled =
					token.isTwoFactorEnabled as boolean;
			}
			if (session.user && token.email) {
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.isOAuth = token.isOAuth as boolean;
			}
			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;
			const existingAccount = await getAccountByUserId(
				existingUser.id
			);
			token.name = existingUser.name;
			token.email = token.email;
			token.role = existingUser.role;
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
			token.isOAuth = !!existingAccount;
			return token;
		},
	},
	session: { strategy: "jwt" },
	...authConfig,
});
