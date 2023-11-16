import Image from "next/image";
import { UpdateEvent, DeleteEvent } from "@/app/ui/eventInfo/buttons";
import EventStatus from "@/app/ui/eventInfo/status";
import { formatDateTimeToLocal } from "@/app/lib/utils";
import { fetchFilteredEvents } from "@/app/lib/data";

export default async function EventsTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const _events = await fetchFilteredEvents(query, currentPage);

	return (
		<div className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-50 p-2 md:pt-0">
					<div className="md:hidden">
						{_events?.map((_event) => (
							<div
								key={_event.id}
								className="mb-2 w-full rounded-md bg-white p-4"
							>
								<div className="flex items-center justify-between border-b pb-4">
									<div>
										<div className="mb-2 flex items-center">
											<Image
												src={_event.image_url}
												className="mr-2 rounded-full"
												width={28}
												height={28}
												alt={`${_event.name}'s profile picture`}
											/>
											<p>{_event.name}</p>
										</div>
										<p className="text-sm text-gray-500">
											{_event.email}
										</p>
									</div>
									<EventStatus status={_event.status} />
								</div>
								<div className="flex w-full items-center justify-between pt-4">
									<div>
										{/* <p className="text-xl font-medium">
											{formatCurrency(invoice.amount)}
										</p> */}
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
										</p>
										<p>
											{
												formatDateTimeToLocal(_event.end_datetime)
													._time
											}
										</p>
									</div>
									<div className="flex justify-end gap-2">
										<UpdateEvent id={_event.id} />
										<DeleteEvent id={_event.id} />
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
									Organizer
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Email
								</th>
								{/* <th scope="col" className="px-3 py-5 font-medium">
									Amount
								</th> */}
								<th scope="col" className="px-3 py-5 font-medium">
									Date
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Start Time
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									End Time
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Status
								</th>
								<th scope="col" className="relative py-3 pl-6 pr-3">
									<span className="sr-only">Edit</span>
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
											<Image
												src={_event.image_url}
												className="rounded-full"
												width={28}
												height={28}
												alt={`${_event.name}'s profile picture`}
											/>
											<p>{_event.name}</p>
										</div>
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{_event.email}
									</td>
									{/* <td className="whitespace-nowrap px-3 py-3">
										{formatCurrency(invoice.amount)}
									</td> */}
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
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{formatDateTimeToLocal(_event.end_datetime)._time}
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										<EventStatus status={_event.status} />
									</td>
									<td className="whitespace-nowrap py-3 pl-6 pr-3">
										<div className="flex justify-end gap-3">
											<UpdateEvent id={_event.id} />
											<DeleteEvent id={_event.id} />
										</div>
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
