import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
	return (
		<CardWrapper
			backButtonText="Back to Login"
			headerLabel="Looks like Something went wrong!"
			backButtonHref="/auth/login"
			backButtonLabel="Sign in"
		>
			<div className="w-full flex justify-center items-center">
				<ExclamationTriangleIcon className="text-destructive" />
			</div>
		</CardWrapper>
	);
};
