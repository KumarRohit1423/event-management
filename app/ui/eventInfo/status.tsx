import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import clsx from "clsx";

export default function EventStatus({ status }: { status: string }) {
	return (
		<span
			className={clsx(
				"inline-flex items-center rounded-full px-2 py-1 text-xs",
				{
					"bg-gray-100 text-purple-600": status === "upcoming",
					"bg-green-500 text-white": status === "ongoing",
					"bg-gray-100 text-gray-500": status === "expired",
				}
			)}
		>
			{status === "upcoming" ? (
				<>
					Upcoming
					<CheckCircleOutlineOutlinedIcon className="ml-1 w-4 text-purple-600" />
				</>
			) : null}
			{status === "ongoing" ? (
				<>
					Ongoing
					<AccessAlarmOutlinedIcon className="ml-1 w-4 text-green-500" />
				</>
			) : null}
			{status === "expired" ? (
				<>
					Expired
					<NotInterestedOutlinedIcon className="ml-1 w-4 text-white" />
				</>
			) : null}
		</span>
	);
}
