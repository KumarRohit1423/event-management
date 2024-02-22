"use client";

import { splitISO8601DateTime } from "@/lib/utils";
import {
	/*OrganizerField,*/ EventForm,
} from "@/lib/definitions";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateEvent } from "@/lib/actions";
// import { useState, ChangeEvent } from "react";
// import Image from "next/image";

export default function Form({
	_event,
}: // organizers,
{
	_event: EventForm;
	// organizers: OrganizerField[];
}) {
	const eventDate = splitISO8601DateTime(_event.start_datetime).date;
	const startTime = splitISO8601DateTime(_event.start_datetime).time;
	const endTime = splitISO8601DateTime(_event.end_datetime).time;

	const updateEventWithId = updateEvent.bind(null, _event.id);

	return (
		<form action={updateEventWithId}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{/* Event Title */}
				<div className="mb-4">
					<label
						htmlFor="title"
						className="mb-2 block text-sm font-medium"
					>
						Event Title
					</label>
					<input
						type="text"
						id="title"
						name="title"
						required
						className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
						placeholder="Enter Event Title"
						defaultValue={_event.title}
					/>
				</div>

				{/* Event Description */}
				<div className="mb-4">
					<label
						htmlFor="description"
						className="mb-2 block text-sm font-medium"
					>
						Event Description
					</label>
					<textarea
						id="description"
						name="description"
						className="peer block w-full rounded border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
						placeholder="Enter Event Description"
						defaultValue={_event.description}
					/>
				</div>

				{/* Event Date */}
				<div className="mb-4">
					<label
						htmlFor="date"
						className="mb-2 block text-sm font-medium"
					>
						Event Date
					</label>
					<input
						type="date"
						id="date"
						name="date"
						required
						defaultValue={eventDate}
						className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
					/>
				</div>

				{/* Start Time */}
				<div className="mb-4">
					<label
						htmlFor="start_time"
						className="mb-2 block text-sm font-medium"
					>
						Start Time
					</label>
					<input
						type="time"
						id="start_time"
						name="start_time"
						required
						defaultValue={startTime}
						className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
					/>
				</div>

				{/* End Time */}
				<div className="mb-4">
					<label
						htmlFor="end_time"
						className="mb-2 block text-sm font-medium"
					>
						End Time
					</label>
					<input
						type="time"
						id="end_time"
						name="end_time"
						required
						defaultValue={endTime}
						className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
					/>
				</div>

				{/* Event Category */}
				<div className="mb-4">
					<label
						htmlFor="category"
						className="mb-2 block text-sm font-medium"
					>
						Event Category
					</label>
					<select
						id="category"
						name="category"
						required
						defaultValue={_event.category}
						className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
					>
						<option value="" disabled>
							Select Event Category
						</option>
						<option value="academic">Academic</option>
						<option value="cultural">Cultural</option>
						<option value="social">Social</option>
						<option value="technology">Technology</option>
						<option value="sports">Sports</option>
					</select>
				</div>
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/landing/upcomingEvents"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<Button type="submit">Modify Event</Button>
			</div>
		</form>
	);
}
