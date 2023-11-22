import EventIcon from "@mui/icons-material/Event";
import { fetchFilteredOrganizers } from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
import GoogleMap from "@/public/about/google-map.jpg";
import GetStarted from "@/public/about/get-start.avif";
import Link from "next/link";

const locations = [
	{
		title: "Bengaluru office",
		timings: "Mon-Sat 9am to 5pm.",
		address:
			"100, Electronic City Phase-1, Bengaluru, Karnataka 560100 IN",
	},
	{
		title: "Head office",
		timings: "Mon-Sat 9am to 5pm.",
		address:
			"12th Main Rd, Indiranagar, Bengaluru, Karnataka 560008 IN",
	},
	{
		title: "Karnataka office",
		timings: "Mon-Sat 9am to 5pm.",
		address:
			"42, Residency Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025 IN",
	},
];

export default async function Page() {
	const users = await fetchFilteredOrganizers("");
	return (
		<>
			<header className="relative w-full border-b bg-white pb-4">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
					<div className="inline-flex items-center space-x-2">
						<span>
							<EventIcon />
						</span>
						<span className="font-bold">Organizzer</span>
					</div>
					<Link href={"/login"}>
						<div className="hidden lg:block">
							<Button>Login</Button>
						</div>
					</Link>
				</div>
			</header>

			<div className="mx-auto max-w-7xl px-4">
				{/* Hero Map */}
				<div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
					<div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
						<p className="text-xs font-semibold leading-normal md:text-sm">
							About the company
						</p>
					</div>
					<p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
						Made with love, right here in India
					</p>
					<p className="max-w-4xl text-base text-gray-600 md:text-xl">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Tempore veritatis voluptates neque itaque repudiandae
						sint, explicabo assumenda quam ratione placeat?
					</p>
				</div>
				<div className="w-full space-y-4">
					<Image
						className="h-[200px] w-full rounded-xl object-cover md:h-full"
						src={GoogleMap}
						alt=""
					/>
				</div>
				{/* locations */}
				<div className="my-8 flex flex-col gap-y-6 md:flex-row lg:justify-around">
					{locations.map((location) => (
						<div
							key={location.title}
							className="flex flex-col space-y-3 md:w-2/4 lg:w-1/5"
						>
							<LocationOnIcon className="h-5 w-5" />
							<p className="w-full text-xl font-semibold  text-gray-900">
								{location.title}
							</p>
							<p className="w-full text-base text-gray-700">
								{location.timings}
							</p>
							<p className="text-sm font-medium">
								{location.address}
							</p>
						</div>
					))}
				</div>
				<hr className="mt-20" />
				{/* greetings */}
				<div className="mt-16 flex items-center">
					<div className="space-y-6 md:w-3/4">
						<div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
							<p className="text-xs font-semibold leading-normal md:text-sm">
								Join Us &rarr;
							</p>
						</div>
						<p className="text-3xl font-bold text-gray-900 md:text-4xl">
							Meet our team
						</p>
						<p className="max-w-4xl text-base text-gray-700 md:text-xl">
							Our philosophy is simple — hire a team of diverse,
							passionate people and foster a culture that empowers you
							to do your best work.
						</p>
						<div></div>
					</div>
				</div>
				{/* TEAM */}
				<div className="grid grid-cols-1 gap-4 gap-y-6 border-b border-gray-300 py-12 pb-20 md:grid-cols-2 lg:grid-cols-4">
					{users.map((user) => (
						<div className="rounded-md border" key={user.name}>
							<Image
								src={user.image_url}
								alt={user.name}
								width={96}
								height={96}
								className="h-[300px] w-full rounded-lg object-cover "
							/>
							<p className="mt-6 w-full px-2 text-xl  font-semibold text-gray-900">
								{user.name}
							</p>
							<p className="w-full px-2 pb-6 text-sm font-semibold text-gray-500">
								{user.email}
							</p>
						</div>
					))}
				</div>
				{/* Hiring Banner */}
				<div className="flex flex-col items-center gap-x-4 gap-y-4 py-16 md:flex-row">
					<div className="space-y-6">
						<p className="text-sm font-semibold md:text-base">
							Join our team &rarr;
						</p>
						<p className="text-3xl font-bold md:text-4xl">
							We&apos;re just getting started
						</p>
						<p className="text-base text-gray-600 md:text-lg">
							Our philosophy is simple — hire a team of diverse,
							passionate people and foster a culture that empowers you
							to do your best work.
						</p>
						<button
							type="button"
							className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
						>
							Join Now
						</button>
					</div>
					<div className="md:mt-o mt-10 w-full">
						<Image
							src={GetStarted}
							alt="Getting Started"
							className="rounded-lg"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
