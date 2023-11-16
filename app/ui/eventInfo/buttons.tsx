import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Link from "next/link";

export function CreateEvent() {
	return (
		<Link
			href="/landing/upcomingEvents/create"
			className="flex h-10 items-center rounded-2xl bg-purple-500 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
		>
			<span className="hidden md:block">Create Event</span>{" "}
			<AddCircleOutlineOutlinedIcon className="h-5 md:ml-4" />
		</Link>
	);
}

export function UpdateEvent({ id }: { id: string }) {
	return (
		<Link
			href="/landing/upocomingEvents"
			className="rounded-md border p-2 hover:bg-gray-100"
		>
			<CreateOutlinedIcon className="w-5" />
		</Link>
	);
}

export function DeleteEvent({ id }: { id: string }) {
	return (
		<>
			<button className="rounded-md border p-2 hover:bg-gray-100">
				<span className="sr-only">Delete</span>
				<DeleteOutlineOutlinedIcon className="w-5" />
			</button>
		</>
	);
}
