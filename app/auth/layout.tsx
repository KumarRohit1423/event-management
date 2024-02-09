import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full flex items-center justify-center bg-[linear-gradient(106.5deg,_rgba(255,_215,_185,_0.91)_23%,_rgba(223,_159,_247,_0.8)_93%)]">
			{children}
		</div>
	);
};

export default AuthLayout;
