"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "@/components/form-messages/form-error";
import { redirect } from "next/navigation";

interface RoleGateProps {
	children: React.ReactNode;
	allowedRole: UserRole;
}
export const RoleGate = ({
	children,
	allowedRole,
}: RoleGateProps) => {
	const role = useCurrentRole();
	if (role !== allowedRole) {
		redirect("/events");
		return (
			<FormError message="You do not have clearance to access this" />
		);
	}
	return <>{children}</>;
};
