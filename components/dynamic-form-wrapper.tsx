import { cn } from "@/lib/utils";
import { GearIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

interface DynamicFormWrapperProps {
	children: React.ReactNode;
	headerTitle: string;
	headerDescription: string;
}

export const DynamicFormWrapper = ({
	children,
	headerTitle,
	headerDescription,
}: DynamicFormWrapperProps) => {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<span className="cursor-pointer">
						<GearIcon className="w-5 h-5" />
					</span>
					{/* <Button variant="outline">
						<RxPencil2 />
					</Button> */}
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{headerTitle}</DialogTitle>
						<DialogDescription>{headerDescription}</DialogDescription>
					</DialogHeader>
					{children}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<span className="cursor-pointer">
					<GearIcon className="w-6 h-6" />
				</span>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>{headerTitle}</DrawerTitle>
					<DrawerDescription>{headerDescription}</DrawerDescription>
				</DrawerHeader>
				{children}
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
