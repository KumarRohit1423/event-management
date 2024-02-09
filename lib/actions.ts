"use server";

import { object, z } from "zod";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import bcrypt from "bcrypt";

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
});

const UserDetailsSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(), // Assuming the description is a string, not a number
	password: z.string(),
	role: z.enum(["user", "organizer"]),
});

const CreateEvent = EventSchema.omit({
	id: true,
	organizer_id: true,
	organizer_name: true,
	status: true,
});

const UpdateEvent = EventSchema.omit({
	id: true,
	organizer_id: true,
	organizer_name: true,
	status: true,
});

const organizer_id = "3958dc9e-737f-4377-85e9-fec4b6a6442a";
const organizer_name = "Maki Zenin";

export async function createEvent(formData: FormData) {
	const rawFormData = Object.fromEntries(formData.entries());
	const validatedFormData = CreateEvent.parse(rawFormData);
	const id = uuidv4();
	const start_datetime = `${validatedFormData.date}T${validatedFormData.start_time}:00Z`;
	const end_datetime = `${validatedFormData.date}T${validatedFormData.end_time}:00Z`;
	const status = "upcoming";
	try {
		await sql`INSERT INTO _events (
	    id,
	    title,
	    description,
	    start_datetime,
	    end_datetime,
	    organizer_id,
	    organizer_name,
	    category,
	    status
	    )
	  VALUES (
	    ${id},
	    ${validatedFormData.title},
	    ${validatedFormData.description},
	    ${start_datetime},
	    ${end_datetime},
	    ${organizer_id},
	    ${organizer_name},
	    ${validatedFormData.category},
	    ${status}
	    )
	`;
	} catch (error) {
		return {
			message: "Database Error: Failed to Create Event.",
		};
	}
	revalidatePath("/landing/upcomingEvents");
	redirect("/landing/upcomingEvents");
}

export async function updateEvent(id: string, formData: FormData) {
	const rawFormData = Object.fromEntries(formData.entries());
	console.log(rawFormData);
	const validatedFormData = UpdateEvent.parse(rawFormData);
	const start_datetime = `${validatedFormData.date}T${validatedFormData.start_time}:00Z`;
	const end_datetime = `${validatedFormData.date}T${validatedFormData.end_time}:00Z`;
	const status = "upcoming";
	try {
		await sql`
	  UPDATE _events
    SET
	    title = ${validatedFormData.title},
	    description = ${validatedFormData.description},
      start_datetime = ${start_datetime},
	    end_datetime = ${end_datetime},
	    category = ${validatedFormData.category},
	    status = ${status}
    WHERE id = ${id}
	`;
	} catch (error) {
		return { message: "Database Error: Failed to Update Event." };
	}
	revalidatePath("/landing/upcomingEvents");
	redirect("/landing/upcomingEvents");
}

export async function deleteEvent(id: string) {
	try {
		await sql`DELETE FROM _events WHERE id = ${id}`;
		revalidatePath("/landing/upcomingEvents");
		return { message: "Deleted Event." };
	} catch (error) {
		return { message: "Database Error: Failed to Delete Event." };
	}
}
