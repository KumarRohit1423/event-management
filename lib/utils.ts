import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatDateTimeToLocal = (
	dateStr: string,
	locale: string = "en-IN"
) => {
	// Create a Date object from the input date string
	const date = new Date(dateStr);
	// Define options for formatting the date
	const options_date: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "short",
		year: "numeric",
	};

	// Define options for formatting the time
	const options_time: Intl.DateTimeFormatOptions = {
		hour: "numeric",
		minute: "numeric",
		// second: "numeric",
		// timeZoneName: "short",
		hour12: true,
	};

	// Create an Intl.DateTimeFormat object with the specified locale and options
	const formatter_date = new Intl.DateTimeFormat(
		locale,
		options_date
	);
	const formatter_time = new Intl.DateTimeFormat(
		locale,
		options_time
	);
	return {
		_date: formatter_date.format(date),
		_time: formatter_time.format(date),
	};
};

export const splitISO8601DateTime = (dateTimeString: string) => {
	const dateObject = new Date(dateTimeString);
	// Extracting date
	const year = dateObject.getFullYear();
	const month = `0${dateObject.getMonth() + 1}`.slice(-2); // Adding 1 because getMonth() returns zero-based index
	const day = `0${dateObject.getDate()}`.slice(-2);
	const date = `${year}-${month}-${day}`;
	// Extracting time
	const hours = `0${dateObject.getHours()}`.slice(-2);
	const minutes = `0${dateObject.getMinutes()}`.slice(-2);
	// const seconds = `0${dateObject.getSeconds()}`.slice(-2);
	const time = `${hours}:${minutes}`;

	return { date, time };
};

export const generatePagination = (
	currentPage: number,
	totalPages: number
) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [
		1,
		"...",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"...",
		totalPages,
	];
};
