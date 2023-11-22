import TitleText from "@/app/ui/dashboard/title-text";
import LoginForm from "@/app/ui/login-form";

export default function Page() {
	return (
		<main className="flex items-center justify-center md:h-screen">
			<div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 rounded-xl md:-mt-32 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
				<div className="flex h-20 w-full items-center justify-center rounded-lg bg-purple-500 p-3 md:h-36 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
					<div className="w-32 text-white justify-center box-content md:w-36">
						<TitleText />
					</div>
				</div>
				<LoginForm />
			</div>
		</main>
	);
}
