import { roboto } from "@/app/ui/fonts";
import Card from "@/app/ui/dashboard/cards";
import { fetchLatestEvents } from "@/app/lib/data";

export default async function Page() {
	const latestEvents = await fetchLatestEvents();
	return (
		<div className="gap-8">
			<div>
				<h1 className={`${roboto.className} text-xl antialiased`}>
					Dashboard
				</h1>
			</div>
			<div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
				{latestEvents.map((event) => {
					return (
						<Card
							key={event.id}
							id={event.id}
							title={event.title}
							description={event.description}
							date={event.date}
							organizer={event.organizer_name}
							category={event.category}
							status={event.status}
						/>
					);
				})}
			</div>
		</div>
	);
}
