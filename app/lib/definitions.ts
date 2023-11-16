// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
	id: string;
	name: string;
	email: string;
	password: string;
};

export type Organizer = {
	id: string;
	name: string;
	email: string;
	image_url: string;
};

export type Event = {
	id: string;
	title: string;
	description: number;
	start_datetime: string;
	end_datetime: string;
	organizer_id: string;
	organizer_name: string;
	category: string;
	status: "upcoming" | "ongoing" | "expired";
};

// export type Revenue = {
//   month: string;
//   revenue: number;
// };

// export type LatestInvoice = {
//   id: string;
//   name: string;
//   image_url: string;
//   email: string;
//   amount: string;
// };

// // The database returns a number for amount, but we later format it to a string with the formatCurrency function
// export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
//   amount: number;
// };

export type EventsTable = {
	id: string;
	title: string;
	description: number;
	start_datetime: string;
	end_datetime: string;
	category: string;
	status: "upcoming" | "ongoing" | "expired";
	name: string;
	email: string;
	image_url: string;
};

export type OrganizersTable = {
	id: string;
	name: string;
	email: string;
	image_url: string;
	total_events: number;
	total_upcoming: number;
	total_completed: number;
};

export type FormattedUsersTable = {
	id: string;
	name: string;
	email: string;
	image_url: string;
	total_events_attended: number;
};

export type OrganizerField = {
	id: string;
	name: string;
};

export type EventForm = {
	id: string;
	organizer_id: string;
	title: string;
	status: "upcoming" | "ongoing" | "expired";
};
