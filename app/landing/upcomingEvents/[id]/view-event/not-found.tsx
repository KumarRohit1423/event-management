import Link from "next/link";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";

export default function NotFound() {
	return (
		<main className="flex h-full flex-col items-center justify-center gap-2">
			<SentimentDissatisfiedOutlinedIcon className="w-10 text-gray-400" />
			<h2 className="text-xl font-semibold">404 Not Found</h2>
			<p>Could not find the requested Event.</p>
			<Link
				href="/landing/upcomingEvents"
				className="mt-4 rounded-md bg-purple-500 px-4 py-2 text-sm text-white transition-colors hover:bg-purple-100 hover:outline hover:outline-2 hover:outline-purple-500 hover:text-purple-500"
			>
				Go Back
			</Link>
		</main>
	);
}
