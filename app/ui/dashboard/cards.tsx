import { roboto } from "@/app/ui/fonts";
import EventStatus from "@/app/ui/eventInfo/status";
import Image from "next/image";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import { title } from "process";
import academic from "@/public/eventCategory/academic-event.gif";
import technology from "@/public/eventCategory/technology-event.gif";
import cultural from "@/public/eventCategory/cultural-event.gif";
import social from "@/public/eventCategory/social-event.gif";
import sports from "@/public/eventCategory/sports-event.gif";

export default function Card({
	id,
	title,
	description,
	date,
	organizer,
	category,
	status,
}: {
	id: string;
	title: string;
	description: string;
	date: string;
	organizer: string;
	category:
		| "academic"
		| "cultural"
		| "technology"
		| "social"
		| "sports";
	status: "upcoming" | "ongoing" | "expired";
}) {
	return (
		<div className="max-w-sm rounded-2xl border">
			<Image
				className="rounded-3xl p-4"
				src={academic}
				alt="academic-banner"
				// width={400}
				// height={300}
			/>
			<div className="flex p-4 flex-col justify-between">
				<h1 className="inline-flex items-center text-lg font-semibold">
					{title}
				</h1>
				<p className="mt-3 text-sm text-gray-600">{description}</p>
				<div className="mt-4">
					<span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
						{organizer}
					</span>
					<span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
						{date}
					</span>
					<span
						className="mb-2 mr-2 inline-block px-3 py-1" /*text-[10px] font-semibold text-gray-900*/
					>
						<EventStatus status={status} />
					</span>
				</div>
				<Link href={`/upcomingEvents/${id}/view-event`}>
					<Button type="button" data-ripple-dark="true">
						Learn More
					</Button>
				</Link>
			</div>
		</div>
	);
}
