import { sql } from "@vercel/postgres";
import type {
	// CustomerField,
	OrganizersTable,
	EventForm,
	EventsTable,
	// LatestInvoiceRaw,
	User,
	OrganizerField,
	// Revenue,
} from "./definitions";
// import { formatCurrency } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

// export async function fetchRevenue() {
//   // Add noStore() here prevent the response from being cached.
//   // This is equivalent to in fetch(..., {cache: 'no-store'}).
//   noStore();
//   try {
//     // Artificially delay a reponse for demo purposes.
//     // Don't do this in real life :)

//     // console.log('Fetching revenue data...');
//     // await new Promise((resolve) => setTimeout(resolve, 3000));

//     const data = await sql<Revenue>`SELECT * FROM revenue`;

//     // console.log('Data fetch complete after 3 seconds.');

//     return data.rows;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch revenue data.");
//   }
// }

// export async function fetchLatestInvoices() {
//   noStore();
//   try {
//     const data = await sql<LatestInvoiceRaw>`
//       SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       ORDER BY invoices.date DESC
//       LIMIT 5`;

//     const latestInvoices = data.rows.map((invoice) => ({
//       ...invoice,
//       amount: formatCurrency(invoice.amount),
//     }));
//     return latestInvoices;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch the latest invoices.");
//   }
// }

// export async function fetchCardData() {
// 	noStore();
// 	try {
// 		// You can probably combine these into a single SQL query
// 		// However, we are intentionally splitting them to demonstrate
// 		// how to initialize multiple queries in parallel with JS.
// 		const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
// 		const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
// 		const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

// 		const data = await Promise.all([
// 			invoiceCountPromise,
// 			customerCountPromise,
// 			invoiceStatusPromise,
// 		]);

// 		const numberOfInvoices = Number(data[0].rows[0].count ?? "0");
// 		const numberOfCustomers = Number(data[1].rows[0].count ?? "0");
// 		const totalPaidInvoices = formatCurrency(
// 			data[2].rows[0].paid ?? "0"
// 		);
// 		const totalPendingInvoices = formatCurrency(
// 			data[2].rows[0].pending ?? "0"
// 		);

// 		return {
// 			numberOfCustomers,
// 			numberOfInvoices,
// 			totalPaidInvoices,
// 			totalPendingInvoices,
// 		};
// 	} catch (error) {
// 		console.error("Database Error:", error);
// 		throw new Error("Failed to card data.");
// 	}
// }

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredEvents(
	query: string,
	currentPage: number
) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	noStore();

	try {
		const _events = await sql<EventsTable>`
      SELECT
        _events.id,
        _events.title,
        _events.description,
        _events.start_datetime,
        _events.end_datetime,
        _events.category,
        _events.status,
        organizers.name,
        organizers.email,
        organizers.image_url
      FROM _events
      JOIN organizers ON _events.organizer_id = organizers.id
      WHERE
        organizers.name ILIKE ${`%${query}%`} OR
        organizers.email ILIKE ${`%${query}%`} OR
        _events.title ILIKE ${`%${query}%`} OR
        _events.category ILIKE ${`%${query}%`} OR
        _events.status ILIKE ${`%${query}%`}
      ORDER BY _events.start_datetime DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

		return _events.rows;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch events.");
	}
}

export async function fetchEventsPages(query: string) {
	noStore();
	try {
		const count = await sql`SELECT COUNT(*)
    FROM _events
    JOIN organizers ON _events.customer_id = organizers.id
    WHERE
      organizers.name ILIKE ${`%${query}%`} OR
      organizers.email ILIKE ${`%${query}%`} OR
      _events.title ILIKE ${`%${query}%`} OR
      _events.organizer_name ILIKE ${`%${query}%`} OR
      _events.category ILIKE ${`%${query}%`} OR
      _events.status ILIKE ${`%${query}%`}
  `;

		const totalPages = Math.ceil(
			Number(count.rows[0].count) / ITEMS_PER_PAGE
		);
		return totalPages;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch total number of events.");
	}
}

// export async function fetchEventById(id: string) {
//   noStore();
//   try {
//     const data = await sql<EventForm>`
//       SELECT
//         _events.id,
//         _events.organizer_id,
//         _events.title,
//         _events.status
//       FROM _events
//       WHERE _events.id = ${id};
//     `;

//     const _event = data.rows.map((_event) => ({
//       ..._event,
//       // Convert amount from cents to dollars
//       amount: _event.amount / 100,
//     }));

//     return invoice[0];
//   } catch (error) {
//     console.error("Database Error:", error);
//   }
// }

export async function fetchOrganizers() {
	noStore();
	try {
		const data = await sql<OrganizerField>`
      SELECT
        id,
        name
      FROM organizers
      ORDER BY name ASC
    `;

		const customers = data.rows;
		return customers;
	} catch (err) {
		console.error("Database Error:", err);
		throw new Error("Failed to fetch all customers.");
	}
}

export async function fetchFilteredOrganizers(query: string) {
	noStore();
	try {
		const data = await sql<OrganizersTable>`
		SELECT 
    organizers.id,
    organizers.name,
    organizers.email,
    organizers.image_url,
    COUNT(_events.id) AS total_events,
    COUNT(CASE WHEN _events.status = 'upcoming') AS total_upcoming,
    COUNT(CASE WHEN _events.status = ('ongoing' | 'paid')) AS total_completed
    FROM organizers LEFT JOIN _events ON organizers.id = _events.customer_id
		WHERE organizers.name ILIKE ${`%${query}%`} OR organizers.email ILIKE ${`%${query}%`}
		GROUP BY organizers.id, organizers.name, organizers.email, organizers.image_url
		ORDER BY organizers.name ASC
	  `;

		const organizers = data.rows.map((organizer) => ({
			...organizer,
			total_upcoming: organizer.total_upcoming,
			total_paid: organizer.total_completed,
		}));

		return organizers;
	} catch (err) {
		console.error("Database Error:", err);
		throw new Error("Failed to fetch customer table.");
	}
}

export async function getUser(email: string) {
	try {
		const user = await sql`SELECT * from USERS where email=${email}`;
		return user.rows[0] as User;
	} catch (error) {
		console.error("Failed to fetch user:", error);
		throw new Error("Failed to fetch user.");
	}
}