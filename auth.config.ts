import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "/login",
	},
	providers: [],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith("/landing");
			if (isOnDashboard) {
				return isLoggedIn;
				 // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				return Response.redirect(new URL("/landing", nextUrl));
			}
			return true;
		},
	}, // Add providers with an empty array for now
} satisfies NextAuthConfig;
