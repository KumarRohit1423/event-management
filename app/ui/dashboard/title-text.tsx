import { roboto } from "@/app/ui/fonts";
export default function TitleText() {
	return (
		<div
			className={`${roboto.className} text-3xl font-semibold md:text-3xl antialiased`}
		>
			Organizzer
		</div>
	);
}
