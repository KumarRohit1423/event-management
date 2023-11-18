import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Link from "next/link";
import { deleteEvent } from "@/app/lib/actions";

export function CreateEvent() {
	return (
		<Link
			href="/landing/upcomingEvents/create"
			className="flex h-10 items-center rounded-3xl bg-purple-500 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-100 hover:text-purple-500 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:outline hover:outline-2 hover:outline-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
		>
			<span className="hidden md:block">Create Event</span>
			<AddCircleOutlineOutlinedIcon className="h-5 md:ml-4" />
		</Link>
	);
}

export function UpdateEvent({ id }: { id: string }) {
	return (
		<Link
			href={`/landing/upcomingEvents/${id}/edit`}
			className="rounded-3xl border p-2 transition-colors hover:bg-purple-100 hover:text-purple-500 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:outline hover:outline-1 hover:outline-purple-500"
		>
			<CreateOutlinedIcon className="w-5" />
		</Link>
	);
}

export function DeleteEvent({ id }: { id: string }) {
	const deleteEventWithId = deleteEvent.bind(null, id);
	return (
		<form action={deleteEventWithId}>
			<button className="rounded-md border p-2 transition-colors hover:bg-purple-100 hover:text-purple-500 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:outline hover:outline-1 hover:outline-purple-500">
				<span className="sr-only">Delete</span>
				<DeleteOutlineOutlinedIcon className="w-5" />
			</button>
		</form>
	);
}
