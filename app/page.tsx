import { roboto } from "@/app/ui/fonts";
import { Button } from "@/app/ui/button";
import Link from "next/link";

export default async function Page() {
	return (
		<main className="flex min-h-screen flex-col p-6 items-center justify-center">
			<div className="flex items-center gap-8">
				<h1 className={`${roboto.className} text-2xl antialiased`}>
					Main Page
				</h1>
				<Link href={"/landing"}>
					<Button children="Landing" />
				</Link>
			</div>
		</main>
	);
}
