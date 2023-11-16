import { roboto } from "@/app/ui/fonts";

export default async function Page() {
	return (
		<main>
			<h1
				className={`${roboto.className} text-2xl md:text-2xl antialiased`}
			>
				Dashboard
			</h1>
		</main>
	);
}
