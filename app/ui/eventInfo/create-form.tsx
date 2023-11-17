"use client";

import { OrganizerField } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/app/ui/button";
// import { useState, ChangeEvent } from "react";
import { createEvent } from "@/app/lib/actions";
// import Image from "next/image";

export default function Form(/*{
	organizers,
}: {
	organizers: OrganizerField[];
}*/) {
	// const [imagePreview, setImagePreview] = useState<string | null>(
	// 	null
	// );

	// const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	const file = e.target.files?.[0];
	// 	if (file) {
	// 		const reader = new FileReader();
	// 		reader.onloadend = () => {
	// 			setImagePreview(reader.result as string);
	// 		};
	// 		reader.readAsDataURL(file);
	// 	}
	// };

	return (
		<form action={createEvent}>
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
						className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
					>
						<option value="" disabled selected>
							Select Event Category
						</option>
						<option value="academic">Academic</option>
						<option value="cultural">Cultural</option>
						<option value="social">Social</option>
						<option value="technology">Technology</option>
						<option value="sports">Sports</option>
					</select>
				</div>

				{/* Image Picker */}
				{/* <div className="mb-4">
					<label
						htmlFor="event_banner"
						className="mb-2 block text-sm font-medium"
					>
						Event Banner (Upload Image)
					</label>
					<input
						type="file"
						id="event_banner"
						name="event_banner"
						accept="image/*" // Allows only image files
						onChange={handleImageChange}
						className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
					/>
				</div> */}
				{/* Image Preview */}
				{/* {imagePreview && (
					<div className="mb-4">
						<label className="mb-2 block text-sm font-medium">
							Event Banner Preview
						</label>
						<Image
							src={imagePreview}
							alt="Event Banner Preview"
							className="max-w-sm rounded-md border border-gray-200"
							width={300}
							height={200}
						/>
					</div>
				)} */}
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/landing/upcomingEvents"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<Button type="submit">Create Event</Button>
			</div>
		</form>
	);
}
