const { db } = require("@vercel/postgres");
const {
	_events,
	organizers,
	users,
} = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		// Create the "users" table if it doesn't exist
		const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

		console.log(`Created "users" table`);

		// Insert data into the "users" table
		const insertedUsers = await Promise.all(
			users.map(async (user) => {
				const hashedPassword = await bcrypt.hash(user.password, 10);
				return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
			})
		);

		console.log(`Seeded ${insertedUsers.length} users`);

		return {
			createTable,
			users: insertedUsers,
		};
	} catch (error) {
		console.error("Error seeding users:", error);
		throw error;
	}
}

async function seedEvents(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

		// Create the "events" table if it doesn't exist
		const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS _events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    organizer_id UUID NOT NULL,
    organizer_name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL
  );
`;

		console.log(`Created "events" table`);

		// Insert data into the "invoices" table
		const insertedEvents = await Promise.all(
			_events.map(
				(_event) => client.sql`
        INSERT INTO _events (
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
          ${_event.id}, 
          ${_event.title}, 
          ${_event.description}, 
          ${_event.start_datetime}, 
          ${_event.end_datetime}, 
          ${_event.organizer_id}, 
          ${_event.organizer_name}, 
          ${_event.category}, 
          ${_event.status}
          )
        ON CONFLICT (id) DO NOTHING;
      `
			)
		);

		console.log(`Seeded ${insertedEvents.length} events`);

		return {
			createTable,
			_events: insertedEvents,
		};
	} catch (error) {
		console.error("Error seeding events:", error);
		throw error;
	}
}

async function seedOrganizers(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

		// Create the "customers" table if it doesn't exist
		const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS organizers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

		console.log(`Created "organizers" table`);

		// Insert data into the "customers" table
		const insertedOrganizers = await Promise.all(
			organizers.map(
				(organizer) => client.sql`
        INSERT INTO organizers (id, name, email, image_url)
        VALUES (${organizer.id}, ${organizer.name}, ${organizer.email}, ${organizer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
			)
		);

		console.log(`Seeded ${insertedOrganizers.length} organizers`);

		return {
			createTable,
			organizers: insertedOrganizers,
		};
	} catch (error) {
		console.error("Error seeding customers:", error);
		throw error;
	}
}

// async function seedRevenue(client) {
//   try {
//     // Create the "revenue" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS revenue (
//         month VARCHAR(4) NOT NULL UNIQUE,
//         revenue INT NOT NULL
//       );
//     `;

//     console.log(`Created "revenue" table`);

//     // Insert data into the "revenue" table
//     const insertedRevenue = await Promise.all(
//       revenue.map(
//         (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedRevenue.length} revenue`);

//     return {
//       createTable,
//       revenue: insertedRevenue,
//     };
//   } catch (error) {
//     console.error('Error seeding revenue:', error);
//     throw error;
//   }
// }

async function main() {
	const client = await db.connect();

	await seedUsers(client);
	await seedOrganizers(client);
	await seedEvents(client);
	// await seedRevenue(client);

	await client.end();
}

main().catch((err) => {
	console.error(
		"An error occurred while attempting to seed the database:",
		err
	);
});
