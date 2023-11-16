import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import clsx from "clsx";

export default function EventStatus({ status }: { status: string }) {
	return (
		<span
			className={clsx(
				"inline-flex items-center rounded-full px-2 py-1 text-xs shadow-[0_5px_8px_rgb(0,0,0,0.15)]",
				{
					"bg-purple-200 text-purple-900 font-medium":
						status === "upcoming",
					"bg-green-200 text-green-900 font-medium animate-bounce":
						status === "ongoing",
					"bg-slate-300 text-slate-900 font-medium":
						status === "expired",
				}
			)}
		>
			{status === "upcoming" ? (
				<>
					Upcoming
					<CheckCircleOutlineOutlinedIcon className="ml-1 w-4 text-purple-900" />
				</>
			) : null}
			{status === "ongoing" ? (
				<>
					Ongoing
					<AccessAlarmOutlinedIcon className="ml-1 w-4 text-green-900" />
				</>
			) : null}
			{status === "expired" ? (
				<>
					Expired
					<NotInterestedOutlinedIcon className="ml-1 w-4 text-slate-900" />
				</>
			) : null}
		</span>
	);
}
