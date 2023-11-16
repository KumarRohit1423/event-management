import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import clsx from "clsx";

export default function EventStatus({
	status,
	eventCount,
}: {
	status: string;
	eventCount: number;
}) {
	return (
		<span
			className={clsx(
				"inline-flex items-center rounded-full px-2 py-1 text-xs shadow-[0_5px_8px_rgb(0,0,0,0.15)]",
				{
					"bg-purple-200 text-purple-900 font-medium":
						status === ("expired" || "ongoing"),
					"bg-green-200 text-green-900 font-medium animate-bounce":
						status === "upcoming",
					"bg-slate-200 text-slate-900 font-medium":
						status === "total",
				}
			)}
		>
			{status === ("expired" || "ongoing") ? (
				<>
					{eventCount}
					<CheckCircleOutlineOutlinedIcon className="ml-1 w-4 text-purple-900" />
				</>
			) : null}
			{status === "upcoming" ? (
				<>
					{eventCount}
					<AdjustOutlinedIcon className="ml-1 w-4 text-green-900" />
				</>
			) : null}
			{status === "total" ? (
				<>
					{eventCount}
					<EventAvailableIcon className="ml-1 w-4 text-slate-900" />
				</>
			) : null}
		</span>
	);
}
