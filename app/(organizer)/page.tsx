import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HomeSplash from "@/public/home-page/home-splash.jpg";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
	return (
		<div className="h-full flex flex-col items-center justify-center gap-12 p-8 bg-[linear-gradient(106.5deg,_rgba(255,_215,_185,_0.91)_23%,_rgba(223,_159,_247,_0.8)_93%)]">
			<div
				className="flex flex-col items-center
          justify-center gap-6"
			>
				<h1
					className={cn(
						"text-6xl font-semibold text-gray-900 drop-shadow",
						inter.className
					)}
				>
					Organizer
				</h1>
				<p className="text-gray-900 text-center">
					Create and manage unforgettable events effortlessly.
				</p>
				<div className="hidden p-6 md:inline-block">
					<LoginButton asChild>
						<Button variant="default" size="lg">
							Enter
						</Button>
					</LoginButton>
				</div>
			</div>
			<div className="md:hidden">
				<Image
					src={HomeSplash}
					alt="Picture signifying event organization"
					sizes="70vh"
					style={{
						width: "100%",
						height: "auto",
						boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
						borderRadius: "10px",
					}}
				/>
			</div>
			<div className="md:hidden">
				<LoginButton>
					<Button variant="default" size="lg">
						Enter
					</Button>
				</LoginButton>
			</div>
			{/* </div> */}
		</div>
	);
}
