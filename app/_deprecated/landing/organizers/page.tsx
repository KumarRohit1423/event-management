import Pagination from "@/app/ui/eventInfo/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/landing/organizers/_components/table";
import { inter } from "@/lib/fonts";
import { TableRowSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	return (
		<div className="w-full">
			<div className="flex w-full items-baseline gap-4">
				<h1
					className={`${inter.className} text-2xl md:text-2xl antialiased`}
				>
					Organizers
				</h1>
				<p
					className={`${inter.className} text-base md:text-base antialiased`}
				>
					[ the people behind all the grandeurs ]
				</p>
			</div>
			<div className="mt-4 md:mt-8 max-w-md">
				<Search placeholder="Find your favorite organizer..." />
				{/* <CreateEvent /> */}
			</div>
			<Suspense
				key={query} // + currentPage}
				fallback={<TableRowSkeleton />}
			>
				<Table query={query} /*currentPage={currentPage}*/ />
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				{/* <Pagination totalPages={2} /> */}
				{/* <Pagination totalPages={totalPages} /> */}
			</div>
		</div>
	);
}
