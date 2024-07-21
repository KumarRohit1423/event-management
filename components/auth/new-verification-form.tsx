"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { HashLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-messages/form-error";
import { FormSuccess } from "@/components/form-messages/form-success";

export const NewVerificationForm = () => {
	const searchParams = useSearchParams();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const token = searchParams.get("token");

	const onSubmit = useCallback(async () => {
		if (success || error) return;
		if (!token) {
			setError("Missing token");
			return;
		}

		await newVerification(token)
			.then((data) => {
				setSuccess(data.success);
				setError(data.error);
			})
			.catch(() => {
				setError("Something went wrong");
			});
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<CardWrapper
			headerLabel="Confirming your email address"
			backButtonText="Back to Login"
			backButtonHref="/auth/login"
			backButtonLabel="Sign in"
		>
			<div className="flex items-center w-full justify-center">
				<HashLoader loading={!success && !error} />
				<FormSuccess message={success} />
				{!success && <FormError message={error} />}
			</div>
		</CardWrapper>
	);
};
