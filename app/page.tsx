import { roboto } from "@/app/ui/fonts";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import Image from "next/image";
import EventImage from "@/public/main/event.jpg";

export default async function Page() {
	return (
		<main>
			<section className="overflow-hidden bg-gray-50 sm:flex sm:flex-col sm:justify-between">
				<div className="p-8 flex justify-between md:p-12 lg:px-16 lg:py-24">
					<div className="mx-auto max-w-xl text-center flex justify-between flex-col">
						<h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
							Manage Events the new way...
						</h2>
						<p className=" text-gray-500  md:mt-4 md:block">
							Welcome to our event management platform, where
							memorable experiences come to life! Discover a seamless
							way to plan and execute unforgettable events
							effortlessly. From weddings to corporate gatherings, our
							website offers comprehensive tools and expert guidance
							to make every occasion exceptional. Explore our array of
							services, streamline your planning process, and create
							moments that linger in memories forever.
						</p>
						<div className="mt-4 flex items-center justify-center md:mt-8">
							<Link href={"/login"}>
								<Button>Get Started</Button>
							</Link>
						</div>
					</div>
				</div>

				<div>
					<Image
						alt="Student"
						src={EventImage}
						className="h-32 object-cover sm:h-full"
					/>
				</div>
			</section>
		</main>
	);
}
