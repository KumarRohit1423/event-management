import { inter } from "@/lib/fonts";
import CardWrapper from "@/app/ui/dashboard/cards";
import { Suspense } from "react";
import { CardsWrapperSkeleton } from "@/app/ui/skeletons";

export default async function Page() {
	return (
		<main>
			<div>
				<h1 className={`${inter.className} text-xl antialiased`}>
					Dashboard
				</h1>
			</div>
			<div className="flex flex-col sm:flex-row sm:flex-wrap gap-6">
				<Suspense fallback={<CardsWrapperSkeleton />}>
					<CardWrapper />
				</Suspense>
			</div>
		</main>
	);
}
