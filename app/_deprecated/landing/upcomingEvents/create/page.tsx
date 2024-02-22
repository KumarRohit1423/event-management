import Form from "@/app/ui/eventInfo/create-form";
import Breadcrumbs from "@/app/ui/eventInfo/breadcrumbs";
// import { fetchOrganizers } from "@/app/lib/data";

export default async function Page() {
	// const organizers = await fetchOrganizers();

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Events", href: "/dashboard/upcomingEvents" },
					{
						label: "Create Event",
						href: "/landing/upcomingEvents/create",
						active: true,
					},
				]}
			/>
			<Form /*organizers={organizers}*/ />
		</main>
	);
}
