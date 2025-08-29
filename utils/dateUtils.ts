import { CalendarDay, WorkoutDay } from "@/types/calendar";

/**
 * Formats a date to a standardized string key for workout schedule lookups
 */
export const formatDateKey = (date: Date): string => {
	// Ensure we have a valid Date object
	if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
		console.warn("Invalid date passed to formatDateKey:", date);
		return new Date().toISOString().split("T")[0]; // Fallback to today
	}
	return date.toISOString().split("T")[0]; // YYYY-MM-DD format
};

/**
 * Gets the short day name (Mon, Tue, etc.)
 */
export const getShortDayName = (date: Date): string => {
	if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
		console.warn("Invalid date passed to getShortDayName:", date);
		date = new Date(); // Fallback to today
	}
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return days[date.getDay()];
};

/**
 * Gets the full month name
 */
export const getMonthName = (date: Date): string => {
	if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
		console.warn("Invalid date passed to getMonthName:", date);
		date = new Date(); // Fallback to today
	}
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return months[date.getMonth()];
};

/**
 * Checks if two dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
	if (!date1 || !(date1 instanceof Date) || isNaN(date1.getTime())) {
		console.warn("Invalid date1 passed to isSameDay:", date1);
		date1 = new Date(); // Fallback to today
	}
	if (!date2 || !(date2 instanceof Date) || isNaN(date2.getTime())) {
		console.warn("Invalid date2 passed to isSameDay:", date2);
		date2 = new Date(); // Fallback to today
	}
	return formatDateKey(date1) === formatDateKey(date2);
};

/**
 * Checks if a date is today
 */
export const isToday = (date: Date): boolean => {
	if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
		console.warn("Invalid date passed to isToday:", date);
		date = new Date(); // Fallback to today
	}
	return isSameDay(date, new Date());
};

/**
 * Gets a date that's offset by a number of days
 */
export const addDays = (date: Date, days: number): Date => {
	if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
		console.warn("Invalid date passed to addDays:", date);
		date = new Date(); // Fallback to today
	}
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

/**
 * Gets the start of week (Monday) for a given date
 */
export const getStartOfWeek = (date: Date): Date => {
	const result = new Date(date);
	const day = result.getDay();
	const diff = result.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
	result.setDate(diff);
	return result;
};

/**
 * Generates 3 consecutive days centered around a given date
 */
export const getThreeDaySpan = (
	centerDate: Date,
	selectedDate: Date,
	workoutSchedule: { [key: string]: WorkoutDay } = {}
): CalendarDay[] => {
	// Validate input dates
	if (
		!centerDate ||
		!(centerDate instanceof Date) ||
		isNaN(centerDate.getTime())
	) {
		console.warn("Invalid centerDate passed to getThreeDaySpan:", centerDate);
		centerDate = new Date(); // Fallback to today
	}
	if (
		!selectedDate ||
		!(selectedDate instanceof Date) ||
		isNaN(selectedDate.getTime())
	) {
		console.warn(
			"Invalid selectedDate passed to getThreeDaySpan:",
			selectedDate
		);
		selectedDate = new Date(); // Fallback to today
	}

	const days: CalendarDay[] = [];

	for (let i = -1; i <= 1; i++) {
		const date = addDays(centerDate, i);
		const dateKey = formatDateKey(date);

		const calendarDay: CalendarDay = {
			date,
			dayOfWeek: getShortDayName(date),
			dayNumber: date.getDate(),
			isToday: isToday(date),
			isSelected: isSameDay(date, selectedDate),
			workout: workoutSchedule[dateKey],
		};

		days.push(calendarDay);
	}

	return days;
};

/**
 * Moves the center date forward or backward by days
 */
export const moveCenterDate = (
	currentCenter: Date,
	direction: "forward" | "backward",
	days: number = 1
): Date => {
	const multiplier = direction === "forward" ? 1 : -1;
	return addDays(currentCenter, days * multiplier);
};

/**
 * Moves the center date forward or backward by 3 days for navigation
 */
export const moveCenterDateByThree = (
	currentCenter: Date,
	direction: "forward" | "backward"
): Date => {
	return moveCenterDate(currentCenter, direction, 3);
};

/**
 * Gets a formatted date string for display (e.g., "August 2025")
 */
export const getFormattedMonthYear = (date: Date): string => {
	if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
		console.warn("Invalid date passed to getFormattedMonthYear:", date);
		date = new Date(); // Fallback to today
	}
	return `${getMonthName(date)} ${date.getFullYear()}`;
};

/**
 * Creates a sample workout schedule for development/testing
 */
export const createSampleWorkoutSchedule = (): {
	[key: string]: WorkoutDay;
} => {
	const today = new Date();
	const schedule: { [key: string]: WorkoutDay } = {};

	// Sample workout plan - 6 day rotation
	const workoutTypes: Omit<WorkoutDay, "id">[] = [
		{
			name: "Upper Body",
			color: "#22d3ee", // cyan
			exercises: [
				{ id: "1", name: "Deadlifts", sets: "4 x 6-8" },
				{ id: "2", name: "Pull-ups", sets: "3 x 8-12" },
				{ id: "3", name: "Dumbbell Press", sets: "3 x 10-12" },
				{ id: "4", name: "Barbell Rows", sets: "3 x 10-12" },
				{ id: "5", name: "Overhead Press", sets: "3 x 8-10" },
			],
		},
		{
			name: "Legs",
			color: "#8b5cf6", // purple
			exercises: [
				{ id: "6", name: "Squats", sets: "4 x 8-10" },
				{ id: "7", name: "Romanian Deadlifts", sets: "3 x 10-12" },
				{ id: "8", name: "Bulgarian Split Squats", sets: "3 x 12 each" },
				{ id: "9", name: "Hip Thrusts", sets: "3 x 12-15" },
			],
		},
		{
			name: "Push",
			color: "#10b981", // emerald
			exercises: [
				{ id: "10", name: "Bench Press", sets: "4 x 6-8" },
				{ id: "11", name: "Incline Dumbbell Press", sets: "3 x 8-10" },
				{ id: "12", name: "Dips", sets: "3 x 10-12" },
				{ id: "13", name: "Lateral Raises", sets: "3 x 12-15" },
			],
		},
		{
			name: "Pull",
			color: "#f59e0b", // amber
			exercises: [
				{ id: "14", name: "Pull-ups", sets: "4 x 6-8" },
				{ id: "15", name: "Barbell Rows", sets: "3 x 8-10" },
				{ id: "16", name: "Face Pulls", sets: "3 x 12-15" },
				{ id: "17", name: "Bicep Curls", sets: "3 x 10-12" },
			],
		},
		{
			name: "Shoulders",
			color: "#ec4899", // pink
			exercises: [
				{ id: "18", name: "Overhead Press", sets: "4 x 6-8" },
				{ id: "19", name: "Lateral Raises", sets: "4 x 12-15" },
				{ id: "20", name: "Rear Delt Flyes", sets: "3 x 12-15" },
				{ id: "21", name: "Upright Rows", sets: "3 x 10-12" },
			],
		},
		{
			name: "Optional Rest",
			color: "#6b7280", // gray
			isRestDay: true,
			exercises: [],
		},
	];

	// Populate schedule for 2 weeks around today
	for (let i = -14; i <= 14; i++) {
		const date = addDays(today, i);
		const dateKey = formatDateKey(date);
		const workoutIndex = Math.abs(i) % workoutTypes.length;
		const workout = workoutTypes[workoutIndex];

		schedule[dateKey] = {
			id: `workout-${dateKey}`,
			...workout,
		};
	}

	return schedule;
};
