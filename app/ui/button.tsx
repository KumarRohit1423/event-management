import clsx from "clsx";

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export function Button({
	children,
	className,
	...rest
}: ButtonProps) {
	return (
		<button
			{...rest}
			data-te-ripple-init
			data-te-ripple-color="light"
			className={clsx(
				"flex h-10 items-center rounded-lg bg-purple-500 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-100 hover:outline hover:outline-2 hover:outline-purple-500 hover:text-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 active:bg-purple-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
				className
			)}
		>
			{children}
		</button>
	);
}