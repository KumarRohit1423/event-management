// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
	{
		id: "410544b2-4001-4271-9855-fec4b6a6442a",
		name: "Shivam",
		email: "shivam@nextmail.com",
		password: "123456",
	},
	{
		id: "410544b2-4002-4271-9855-fec4b6a6442a",
		name: "Anshu",
		email: "anshu@nextmail.com",
		password: "234561",
	},
	{
		id: "410544b2-4003-4271-9855-fec4b6a6442a",
		name: "Ashutosh",
		email: "user@nextmail.com",
		password: "345612",
	},
	{
		id: "410544b2-4004-4271-9855-fec4b6a6442a",
		name: "Rohit",
		email: "rohit@nextmail.com",
		password: "456123",
	},
	{
		id: "410544b2-4005-4271-9855-fec4b6a6442a",
		name: "Varun",
		email: "varun@nextmail.com",
		password: "561234",
	},
	{
		id: "410544b2-4006-4271-9855-fec4b6a6442a",
		name: "Himanshu",
		email: "himanshu@nextmail.com",
		password: "612345",
	},
	{
		id: "410544b2-4007-4271-9855-fec4b6a6442a",
		name: "Utkarsh",
		email: "utkarsh@nextmail.com",
		password: "123456",
	},
];

const organizers = [
	{
		id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
		name: "Yuji itadori",
		email: "itadori@yuji.com",
		image_url: "/organizers/yuji-itadori.png",
	},
	{
		id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
		name: "Satoru Gojo",
		email: "gojo@satoru.com",
		image_url: "/organizers/gojo-satoru.png",
	},
	{
		id: "+",
		name: "Maki Zenin",
		email: "zenin@maki.com",
		image_url: "/organizers/maki-zenin.png",
	},
	{
		id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
		name: "Kento Nanami",
		email: "nanami@kento.com",
		image_url: "/organizers/kento-nanami.png",
	},
	{
		id: "3958dc9e-787f-4377-85e9-fec4b6a6442a",
		name: "Monkey D Garp",
		email: "garp@monkey.com",
		image_url: "/organizers/monkey-d-garp.png",
	},
];

const _events = [
	{
		id: "eec0af4a-83f1-11ee-b962-0242ac120002",
		title: "Networking Event",
		description: "Connect with professionals in the industry.",
		start_datetime: "2024-12-06T18:30:00Z",
		end_datetime: "2024-12-06T19:50:00Z", // Hardcoded random duration: 1 hour and 20 minutes
		organizer_id: organizers[0].id,
		organizer_name: organizers[0].name,
		category: "Networking",
		status: "upcoming",
	},
	{
		id: "eec0af4a-83f1-11ee-b962-0242ac120003",
		title: "Workshop on Innovation",
		description: "Learn about the latest trends in innovation.",
		start_datetime: "2024-12-07T15:45:00Z",
		end_datetime: "2024-12-07T17:30:00Z", // Hardcoded random duration: 1 hour and 45 minutes
		organizer_id: organizers[1].id,
		organizer_name: organizers[1].name,
		category: "Workshop",
		status: "upcoming",
	},
	{
		id: "eec0af4a-83f1-11ee-b962-0242ac120004",
		title: "Tech Conference",
		description: "Explore advancements in technology.",
		start_datetime: "2024-12-10T09:00:00Z",
		end_datetime: "2024-12-10T11:15:00Z", // Hardcoded random duration: 2 hours and 15 minutes
		organizer_id: organizers[2].id,
		organizer_name: organizers[2].name,
		category: "Conference",
		status: "upcoming",
	},
	{
		id: "eec0af4a-83f1-11ee-b962-0242ac120005",
		title: "Community Meetup",
		description: "Join fellow community members for discussions.",
		start_datetime: "2024-12-12T19:00:00Z",
		end_datetime: "2024-12-12T20:30:00Z", // Hardcoded random duration: 1 hour and 30 minutes
		organizer_id: organizers[3].id,
		organizer_name: organizers[3].name,
		category: "Meetup",
		status: "upcoming",
	},
	{
		id: "eec0af4a-83f1-11ee-b962-0242ac120006",
		title: "Panel Discussion",
		description: "Hear from experts in the field.",
		start_datetime: "2024-12-15T16:30:00Z",
		end_datetime: "2024-12-15T18:00:00Z", // Hardcoded random duration: 1 hour and 30 minutes
		organizer_id: organizers[4].id,
		organizer_name: organizers[4].name,
		category: "Discussion",
		status: "upcoming",
	},
	{
		id: "eec0af4a-83f1-11ee-b962-0242ac120007",
		title: "Career Fair",
		description: "Explore job opportunities with leading companies.",
		start_datetime: "2022-12-18T10:00:00Z",
		end_datetime: "2022-12-18T12:00:00Z", // Hardcoded random duration: 2 hours
		organizer_id: organizers[0].id,
		organizer_name: organizers[0].name,
		category: "Job Fair",
		status: "expired",
	},
	{
		id: "eec0af4a-83f1-11ee-b962-0242ac120008",
		title: "Art Exhibition",
		description: "Admire and purchase art from local artists.",
		start_datetime: "2022-12-20T14:00:00Z",
		end_datetime: "2022-12-20T16:30:00Z", // Hardcoded random duration: 2 hours and 30 minutes
		organizer_id: organizers[1].id,
		organizer_name: organizers[1].name,
		category: "Art",
		status: "expired",
	},
	{
		id: "eec0af4a-83f1-11ee-b962-0242ac120009",
		title: "Fitness Workshop",
		description: "Stay active and healthy with fitness experts.",
		start_datetime: "2022-12-22T17:30:00Z",
		end_datetime: "2022-12-22T18:45:00Z", // Hardcoded random duration: 1 hour and 15 minutes
		organizer_id: organizers[2].id,
		organizer_name: organizers[2].name,
		category: "Workshop",
		status: "expired",
	},
	{
		id: "eec0af4a-83f1-11ee-b962-0242ac120010",
		title: "Music Concert",
		description: "Enjoy live performances from local musicians.",
		start_datetime: "2022-12-25T20:00:00Z",
		end_datetime: "2022-12-25T21:30:00Z", // Hardcoded random duration: 1 hour and 30 minutes
		organizer_id: organizers[3].id,
		organizer_name: organizers[3].name,
		category: "Concert",
		status: "expired",
	},
	{
		id: "eec0af4a-83f1-11ee-b962-0242ac120011",
		title: "Educational Seminar",
		description: "Learn from educational experts on various topics.",
		start_datetime: "2022-12-28T13:45:00Z",
		end_datetime: "2022-12-28T15:00:00Z", // Hardcoded random duration: 1 hour and 15 minutes
		organizer_id: organizers[4].id,
		organizer_name: organizers[4].name,
		category: "Seminar",
		status: "expired",
	},
	{
		id: "eec0af4a-83f1-11ee-b962-0242ac120012",
		title: "TypeScript Bootcamp",
		description:
			"Learn Basics of TypeScript with some advanced concepts and some JS refresher.",
		start_datetime: "2023-11-14T12:00:00Z",
		end_datetime: "2023-11-26T14:30:00Z",
		organizer_id: organizers[0].id,
		organizer_name: organizers[0].name,
		category: "Bootcamp",
		status: "ongoing",
	},
];

// const revenue = [
//   { month: 'Jan', revenue: 2000 },
//   { month: 'Feb', revenue: 1800 },
//   { month: 'Mar', revenue: 2200 },
//   { month: 'Apr', revenue: 2500 },
//   { month: 'May', revenue: 2300 },
//   { month: 'Jun', revenue: 3200 },
//   { month: 'Jul', revenue: 3500 },
//   { month: 'Aug', revenue: 3700 },
//   { month: 'Sep', revenue: 2500 },
//   { month: 'Oct', revenue: 2800 },
//   { month: 'Nov', revenue: 3000 },
//   { month: 'Dec', revenue: 4800 },
// ];

module.exports = {
	users,
	organizers,
	_events,
	// revenue,
};
