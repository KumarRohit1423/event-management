import Form from "@/app/ui/eventInfo/edit-form";
import Breadcrumbs from "@/app/ui/eventInfo/breadcrumbs";
import { fetchEventById /*fetchOrganizers*/ } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Page({
	params,
}: {
	params: { id: string };
}) {
	const id = params.id;
	const [_event /*organizers*/] = await Promise.all([
		fetchEventById(id),
		// fetchOrganizers(),
	]);
	if (!_event) {
		notFound();
	}
	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Events", href: "/landing/upcomingEvents" },
					{
						label: "Edit Event",
						href: `/landing/upcomingEvents/${id}/edit`,
						active: true,
					},
				]}
			/>
			<Form _event={_event} /*organizers={organizers}*/ />
		</main>
	);
}
