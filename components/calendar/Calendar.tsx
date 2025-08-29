import React, { useCallback, useMemo, useState } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import { CalendarProps } from "@/types/calendar";
import { CALENDAR_ANIMATION_CONFIG } from "@/utils/animationConfig";
import { getCachedThreeDaySpan } from "@/utils/calendarPerformance";
import {
	addDays,
	createSampleWorkoutSchedule,
	getFormattedMonthYear,
	getThreeDaySpan,
} from "@/utils/dateUtils";

import CalendarGestureHandler from "./CalendarGestureHandler";
import CalendarHeader from "./CalendarHeader";
import ExerciseList from "./ExerciseList";
import OptimizedDayCard from "./OptimizedDayCard";

const { width: screenWidth } = Dimensions.get("window");
const CARD_CONTAINER_WIDTH = screenWidth - 32;
const DAY_MS = 86400000;

export default function Calendar({
	onDateSelect,
	workoutSchedule = createSampleWorkoutSchedule(),
	initialDate = new Date(),
}: CalendarProps) {
	const [centerDate, setCenterDate] = useState(initialDate);
	const [selectedDate, setSelectedDate] = useState(initialDate);
	const [isNavigating, setIsNavigating] = useState(false);

	// Animation values
	const translateX = useSharedValue(0);

	// Generate current and adjacent day spans for smooth transitions
	const { currentSpan, nextSpan, prevSpan } = useMemo(() => {
		const current = getCachedThreeDaySpan(
			centerDate,
			selectedDate,
			workoutSchedule,
			getThreeDaySpan
		);
		const nextCenter = addDays(centerDate, 3);
		const prevCenter = addDays(centerDate, -3);
		const next = getCachedThreeDaySpan(
			nextCenter,
			selectedDate,
			workoutSchedule,
			getThreeDaySpan
		);
		const prev = getCachedThreeDaySpan(
			prevCenter,
			selectedDate,
			workoutSchedule,
			getThreeDaySpan
		);

		return {
			currentSpan: current,
			nextSpan: next,
			prevSpan: prev,
		};
	}, [centerDate, selectedDate, workoutSchedule]);

	// Get the selected day's workout (memoized for performance)
	const selectedWorkout = useMemo(
		() => currentSpan.find((day) => day.isSelected)?.workout || null,
		[currentSpan]
	);

	// Handle date selection
	const handleDateSelect = useCallback(
		(date: Date) => {
			setSelectedDate(date);
			onDateSelect?.(date);
		},
		[onDateSelect]
	);

	// Handle navigation completion
	const handleNavigationComplete = useCallback((newCenterTs: number) => {
		const newCenterDate = new Date(newCenterTs);
		setCenterDate(newCenterDate);
		setSelectedDate(newCenterDate);
		translateX.value = 0; // reset after state update
		setIsNavigating(false);
	}, []);

	// Get formatted month and year for header
	const formattedDate = getFormattedMonthYear(centerDate);
	const [monthName, year] = formattedDate.split(" ");

	// Animate to next 3 days (left arrow)
	const handleNextWeek = useCallback(() => {
		if (isNavigating) return;
		setIsNavigating(true);

		// Pre-calculate new center timestamp on JS thread
		const newCenterTs = centerDate.getTime() + 3 * DAY_MS;

		translateX.value = withTiming(
			-CARD_CONTAINER_WIDTH,
			{ duration: CALENDAR_ANIMATION_CONFIG.duration },
			(finished) => {
				if (finished) {
					runOnJS(handleNavigationComplete)(newCenterTs);
				}
			}
		);
	}, [isNavigating, centerDate, translateX, handleNavigationComplete]);

	// Animate to previous 3 days (right arrow)
	const handlePreviousWeek = useCallback(() => {
		if (isNavigating) return;
		setIsNavigating(true);

		const newCenterTs = centerDate.getTime() - 3 * DAY_MS;

		translateX.value = withTiming(
			CARD_CONTAINER_WIDTH,
			{ duration: CALENDAR_ANIMATION_CONFIG.duration },
			(finished) => {
				if (finished) {
					runOnJS(handleNavigationComplete)(newCenterTs);
				}
			}
		);
	}, [isNavigating, centerDate, translateX, handleNavigationComplete]);

	// Gesture handlers for swipe navigation
	const handleSwipeLeft = useCallback(() => {
		handleNextWeek();
	}, [handleNextWeek]);

	const handleSwipeRight = useCallback(() => {
		handlePreviousWeek();
	}, [handlePreviousWeek]);

	// Animated styles for the day spans
	const currentSpanStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	const nextSpanStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value + CARD_CONTAINER_WIDTH }],
	}));

	const prevSpanStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value - CARD_CONTAINER_WIDTH }],
	}));

	// Render a day span
	const renderDaySpan = (days: any[], style: any, key: string) => (
		<Animated.View
			key={key}
			className="flex-row py-4 absolute w-full"
			style={style}
		>
			{days.map((day, index) => (
				<OptimizedDayCard
					key={day.date.toISOString()}
					day={day}
					onPress={handleDateSelect}
					isMiddleCard={index === 1}
				/>
			))}
		</Animated.View>
	);

	return (
		<View className="flex-1">
			{/* Calendar Header */}
			<CalendarHeader
				currentMonth={monthName}
				currentYear={parseInt(year, 10)}
				onPreviousWeek={handlePreviousWeek}
				onNextWeek={handleNextWeek}
			/>

			{/* Three Day Cards Container with Gesture Support */}
			<View className="mb-8">
				<CalendarGestureHandler
					onSwipeLeft={handleSwipeLeft}
					onSwipeRight={handleSwipeRight}
					disabled={isNavigating}
				>
					<View className="overflow-hidden mx-4" style={{ height: 160 }}>
						{renderDaySpan(prevSpan, prevSpanStyle, "prev")}
						{renderDaySpan(currentSpan, currentSpanStyle, "current")}
						{renderDaySpan(nextSpan, nextSpanStyle, "next")}
					</View>
				</CalendarGestureHandler>
			</View>

			{/* Exercise List for Selected Day */}
			<ExerciseList workout={selectedWorkout} isVisible={true} />
		</View>
	);
}
