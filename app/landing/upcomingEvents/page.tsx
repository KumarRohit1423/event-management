import Pagination from "@/app/ui/eventInfo/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/eventInfo/table";
import { CreateEvent } from "@/app/ui/eventInfo/buttons";
import { roboto } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
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
			<div className="flex w-full items-center justify-between">
				<h1 className={`${roboto.className} text-2xl`}>
					Upcoming Events
				</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Search placeholder="Search past events..." />
				<CreateEvent />
			</div>
			<Suspense
				key={query + currentPage}
				fallback={<InvoicesTableSkeleton />}
			>
				<Table query={query} currentPage={currentPage} />
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				{/* <Pagination totalPages={2} /> */}
				{/* <Pagination totalPages={totalPages} /> */}
			</div>
		</div>
	);
}
