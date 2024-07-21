export const publicRoutes: string[] = [
	"/",
	"/auth/new-verification",
	"/about",
	"/events",
	"/contact",
];

export const authRoutes: string[] = [
	"/auth/login",
	"/auth/register",
	"/auth/error",
	"/auth/forgot-password",
	"/auth/new-password",
];

export const apiAuthPrefix: string = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT: string = "/profile";
