"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-messages/form-success";
import { UserRole } from "@prisma/client";

const DashboardPage = () => {
	return (
		<div>
			<RoleGate allowedRole={UserRole.ORGANISER}>
				<FormSuccess message="Allowed to access" />
			</RoleGate>
		</div>
	);
};

export default DashboardPage;
