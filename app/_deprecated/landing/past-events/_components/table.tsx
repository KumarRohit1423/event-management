import EventStatus from "@/app/ui/eventInfo/status";
import { formatDateTimeToLocal } from "@/lib/utils";
import { fetchFilteredPastEvents } from "@/lib/data";

export default async function EventsTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const _events = await fetchFilteredPastEvents(query, currentPage);

	return (
		<div className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-50 p-2 md:pt-0">
					<div className="md:hidden">
						{_events?.map((_event) => (
							<div
								key={_event.id}
								className="mb-2 w-full rounded-md bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
							>
								<div className="flex items-center justify-between border-b pb-4">
									<div>
										<div className="mb-2 flex items-center">
											<p>{_event.title}</p>
										</div>
										<p className="text-sm text-gray-500">
											{_event.name}
										</p>
									</div>
									<EventStatus status={_event.status} />
								</div>
								<div className="flex w-full items-center justify-between pt-4">
									<div>
										<p>
											{
												formatDateTimeToLocal(_event.start_datetime)
													._date
											}
										</p>
										<p>
											{
												formatDateTimeToLocal(_event.start_datetime)
													._time
											}
											&nbsp;-&nbsp;
											{
												formatDateTimeToLocal(_event.end_datetime)
													._time
											}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
					<table className="hidden min-w-full text-gray-900 md:table">
						<thead className="rounded-lg text-left text-sm font-normal">
							<tr>
								<th
									scope="col"
									className="px-4 py-5 font-medium sm:pl-6"
								>
									Event
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Organizer
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Date
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Time
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Status
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{_events?.map((_event) => (
								<tr
									key={_event.id}
									className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
								>
									<td className="whitespace-nowrap py-3 pl-6 pr-3">
										<div className="flex items-center gap-3">
											<p>{_event.title}</p>
										</div>
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{_event.name}
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{
											formatDateTimeToLocal(_event.start_datetime)
												._date
										}
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{
											formatDateTimeToLocal(_event.start_datetime)
												._time
										}
										&nbsp;-&nbsp;
										{formatDateTimeToLocal(_event.end_datetime)._time}
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										<EventStatus status={_event.status} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
