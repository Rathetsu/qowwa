// Calendar and workout-related types

export interface Exercise {
	id: string;
	name: string;
	sets: string; // e.g., "4 x 6-8", "3 x 8-12"
	targetMuscle?: string;
	isCompleted?: boolean;
}

export interface WorkoutDay {
	id: string;
	name: string; // e.g., "Upper Body", "Legs", "Push", "Pull"
	exercises: Exercise[];
	color: string; // Hex color for theming
	isRestDay?: boolean;
}

export interface CalendarDay {
	date: Date;
	dayOfWeek: string; // "Mon", "Tue", etc.
	dayNumber: number; // 1-31
	isToday: boolean;
	isSelected: boolean;
	workout?: WorkoutDay;
}

export interface CalendarState {
	currentDate: Date;
	selectedDate: Date;
	workoutSchedule: { [key: string]: WorkoutDay }; // Date string as key
	visibleDays: CalendarDay[];
}

export interface CalendarProps {
	onDateSelect?: (date: Date) => void;
	workoutSchedule?: { [key: string]: WorkoutDay };
	initialDate?: Date;
}

export interface DayCardProps {
	day: CalendarDay;
	onPress: (date: Date) => void;
	isMiddleCard?: boolean;
}

export interface CalendarHeaderProps {
	currentMonth: string;
	currentYear: number;
	onPreviousWeek: () => void;
	onNextWeek: () => void;
}

export interface ExerciseListProps {
	workout: WorkoutDay | null;
	isVisible: boolean;
}
