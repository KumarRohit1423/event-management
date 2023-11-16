import Pagination from "@/app/ui/eventInfo/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/pastEventInfo/table";
import { roboto } from "@/app/ui/fonts";
import { EventsTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchPastEventsPages } from "@/app/lib/data";
// import { CreateEvent } from "@/app/ui/eventInfo/buttons";

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
	const totalPages = await fetchPastEventsPages(query);

	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${roboto.className} text-2xl`}>
					Past Events
				</h1>
			</div>
			<div className="mt-4 flex items-center md:mt-8">
				<Search placeholder="Search past events..." />
			</div>
			<Suspense
				key={query + currentPage}
				fallback={<EventsTableSkeleton />}
			>
				<Table query={query} currentPage={currentPage} />
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}
