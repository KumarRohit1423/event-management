"use server";

import { z } from "zod";

const EventSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(), // Assuming the description is a string, not a number
	date: z.string(),
	start_time: z.string(),
	end_time: z.string(),
	organizer_id: z.string(),
	organizer_name: z.string(),
	category: z.string(),
	status: z.enum(["upcoming", "ongoing", "expired"]),
	event_banner: z.union([z.instanceof(File), z.null()]).optional(),
});

const CreateEvent = EventSchema.omit({
	id: true,
	organizer_id: true,
	organizer_name: true,
	status: true,
});

export async function createEvent(formData: FormData) {
	const rawFormData = CreateEvent.parse(
		Object.fromEntries(formData.entries())
	);
	// Test it out:
	console.log(rawFormData);
}
