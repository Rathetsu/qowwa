import { CalendarDay, WorkoutDay } from "@/types/calendar";
import { formatDateKey } from "@/utils/dateUtils";

/**
 * High-performance calendar utilities optimized for smooth animations
 */

// Cache for computed day spans to avoid recalculation
const daySpanCache = new Map<string, CalendarDay[]>();
const cacheSize = 50; // Keep last 50 computed spans

/**
 * Generates a cache key for day span computation
 */
export const generateCacheKey = (
	centerDate: Date,
	selectedDate: Date
): string => {
	const centerKey = formatDateKey(centerDate);
	const selectedKey = formatDateKey(selectedDate);
	return `${centerKey}-${selectedKey}`;
};

/**
 * Cached version of getThreeDaySpan for performance
 */
export const getCachedThreeDaySpan = (
	centerDate: Date,
	selectedDate: Date,
	workoutSchedule: { [key: string]: WorkoutDay },
	computeSpan: (
		center: Date,
		selected: Date,
		schedule: { [key: string]: WorkoutDay }
	) => CalendarDay[]
): CalendarDay[] => {
	const cacheKey = generateCacheKey(centerDate, selectedDate);

	// Check cache first
	const cached = daySpanCache.get(cacheKey);
	if (cached) {
		return cached;
	}

	// Compute new span
	const span = computeSpan(centerDate, selectedDate, workoutSchedule);

	// Add to cache (with size management)
	if (daySpanCache.size >= cacheSize) {
		const firstKey = daySpanCache.keys().next().value;
		daySpanCache.delete(firstKey);
	}
	daySpanCache.set(cacheKey, span);

	return span;
};

/**
 * Pre-compute multiple day spans for smoother transitions
 */
export const precomputeAdjacentSpans = (
	centerDate: Date,
	selectedDate: Date,
	workoutSchedule: { [key: string]: WorkoutDay },
	computeSpan: (
		center: Date,
		selected: Date,
		schedule: { [key: string]: WorkoutDay }
	) => CalendarDay[]
) => {
	const spans = [];

	// Pre-compute 3 spans: previous, current, next
	for (let offset = -3; offset <= 3; offset += 3) {
		const targetDate = new Date(centerDate);
		targetDate.setDate(targetDate.getDate() + offset);

		const span = getCachedThreeDaySpan(
			targetDate,
			selectedDate,
			workoutSchedule,
			computeSpan
		);

		spans.push({
			centerDate: targetDate,
			days: span,
			offset,
		});
	}

	return spans;
};

/**
 * Batch workout lookups for performance
 */
export const batchWorkoutLookup = (
	dates: Date[],
	workoutSchedule: { [key: string]: WorkoutDay }
): WorkoutDay[] => {
	return dates.map((date) => {
		const dateKey = formatDateKey(date);
		return workoutSchedule[dateKey];
	});
};

/**
 * Clear cache when needed (e.g., when workout schedule changes)
 */
export const clearDaySpanCache = (): void => {
	daySpanCache.clear();
};

/**
 * Optimize day card rendering by pre-computing all style states
 */
export const precomputeDayCardStyles = (day: CalendarDay) => {
	const styles = {
		cardStyle: "",
		textColor: "",
		workoutTextColor: "",
		cardScale: "",
		cardOpacity: "",
		workoutColor: "#6b7280",
	};

	// Pre-compute all conditional styles
	if (day.isSelected) {
		styles.cardStyle =
			"bg-white/20 border-2 border-cyan-400 shadow-2xl backdrop-blur-sm";
		styles.textColor = "text-white";
		styles.workoutTextColor = "text-white";
	} else if (day.isToday && !day.isSelected) {
		styles.cardStyle =
			"bg-white/10 border border-cyan-300/60 shadow-xl backdrop-blur-sm";
		styles.textColor = "text-cyan-300";
		styles.workoutTextColor = "text-cyan-200";
	} else {
		styles.cardStyle =
			"bg-white/8 border border-white/15 shadow-lg backdrop-blur-sm";
		styles.textColor = "text-gray-300";
		styles.workoutTextColor = "text-gray-400";
	}

	if (day.workout) {
		styles.workoutColor = day.workout.color;
	}

	return styles;
};
