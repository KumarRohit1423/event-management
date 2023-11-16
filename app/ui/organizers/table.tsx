import Image from "next/image";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import IconButton from "@mui/material/IconButton";
import OrganizerStatus from "@/app/ui/organizers/organizer-status";
import { fetchFilteredOrganizers } from "@/app/lib/data";
// import Button from "@mui/material/Button";
// import { UpdateEvent, DeleteEvent } from "@/app/ui/eventInfo/buttons";
// import { formatDateTimeToLocal } from "@/app/lib/utils";
// import Link from "next/link";

export default async function OrganizersTable({
	query,
}: {
	query: string;
}) {
	const organizers = await fetchFilteredOrganizers(query);

	return (
		<div className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-50 p-2 md:pt-0">
					<div className="md:hidden">
						{organizers?.map((organizer) => (
							<div
								key={organizer.id}
								className="mb-2 w-full rounded-md bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
							>
								<div className="flex items-center justify-between border-b pb-4">
									<div>
										<div className="mb-2 flex items-center">
											<Image
												src={organizer.image_url}
												className="mr-2 rounded-full"
												width={28}
												height={28}
												alt={`${organizer.name}'s profile picture`}
											/>
											<p>{organizer.name}</p>
										</div>
										<p className="text-sm text-gray-500">
											{organizer.email}
										</p>
									</div>
									<OrganizerStatus
										status={"total"}
										eventCount={organizer.total_events}
									/>
								</div>
								<div className="flex w-full items-center justify-between pt-4">
									<div>
										<p>
											<OrganizerStatus
												status={"expired"}
												eventCount={organizer.total_completed}
											/>
										</p>
										<p>
											<OrganizerStatus
												status={"upcoming"}
												eventCount={organizer.total_upcoming}
											/>
										</p>
									</div>
									<div className="flex justify-end gap-2">
										<IconButton
											// color="secondary"
											aria-label="give a supporting star"
										>
											<AutoAwesomeOutlinedIcon />
										</IconButton>
										<IconButton
											// color="secondary"
											aria-label="mail the organizer"
										>
											<EmailOutlinedIcon />
										</IconButton>
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
								<th scope="col" className="px-3 py-5 font-medium">
									Upcoming Events
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Completed Events
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Total Events
								</th>
								<th scope="col" className="relative py-3 pl-6 pr-3">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{organizers?.map((organizer) => (
								<tr
									key={organizer.id}
									className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
								>
									<td className="whitespace-nowrap py-3 pl-6 pr-3">
										<div className="flex items-center gap-3">
											<Image
												src={organizer.image_url}
												className="rounded-full"
												width={28}
												height={28}
												alt={`${organizer.name}'s profile picture`}
											/>
											<p>{organizer.name}</p>
										</div>
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{organizer.email}
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										<OrganizerStatus
											status={"upcoming"}
											eventCount={organizer.total_upcoming}
										/>
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										<OrganizerStatus
											status={"expired"}
											eventCount={organizer.total_completed}
										/>
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										<OrganizerStatus
											status={"total"}
											eventCount={organizer.total_events}
										/>
									</td>
									<td className="whitespace-nowrap py-3 pl-6 pr-3">
										<div className="flex justify-end gap-3">
											<IconButton
												color="secondary"
												aria-label="give a supporting star"
											>
												<AutoAwesomeOutlinedIcon />
											</IconButton>
											<IconButton
												color="secondary"
												aria-label="mail the organizer"
											>
												<EmailOutlinedIcon />
											</IconButton>
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
