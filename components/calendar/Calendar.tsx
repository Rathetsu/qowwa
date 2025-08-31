import React, { useCallback, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import Animated from "react-native-reanimated";

import { CalendarProps } from "@/types/calendar";
import { getCachedThreeDaySpan } from "@/utils/calendarPerformance";
import {
	addDays,
	createSampleWorkoutSchedule,
	getFormattedMonthYear,
	getThreeDaySpan,
} from "@/utils/dateUtils";

import CalendarHeader from "./CalendarHeader";
import DayCard from "./DayCard";
import ExerciseList from "./ExerciseList";

const { width: screenWidth } = Dimensions.get("window");
const CARD_CONTAINER_WIDTH = screenWidth - 32;
const CURRENT_INDEX = 5; // Index of the current span in the array (5 prev + current + 5 next)

interface SpanData {
	id: string;
	centerDate: Date;
	days: any[];
}

export default function Calendar({
	onDateSelect,
	workoutSchedule = createSampleWorkoutSchedule(),
	initialDate = new Date(),
}: CalendarProps) {
	const [centerDate, setCenterDate] = useState(initialDate);
	const [selectedDate, setSelectedDate] = useState(initialDate);
	const [isNavigating, setIsNavigating] = useState(false);
	const flatListRef = useRef<FlatList>(null);

	// Generate 11 spans: 5 previous + current + 5 next
	const spans = useMemo(() => {
		const spanArray: SpanData[] = [];

		for (let i = -5; i <= 5; i++) {
			const spanCenterDate = addDays(centerDate, i * 3);
			const spanDays = getCachedThreeDaySpan(
				spanCenterDate,
				selectedDate,
				workoutSchedule,
				getThreeDaySpan
			);

			spanArray.push({
				id: `span-${spanCenterDate.getTime()}`,
				centerDate: spanCenterDate,
				days: spanDays,
			});
		}

		return spanArray;
	}, [centerDate, selectedDate, workoutSchedule]);

	// Get the selected day's workout from current span
	const selectedWorkout = useMemo(() => {
		const currentSpan = spans[CURRENT_INDEX];
		return currentSpan?.days.find((day) => day.isSelected)?.workout || null;
	}, [spans]);

	// Handle date selection
	const handleDateSelect = useCallback(
		(date: Date) => {
			setSelectedDate(date);
			onDateSelect?.(date);
		},
		[onDateSelect]
	);

	// Navigate to next span (left arrow / swipe left)
	const handleNextWeek = useCallback(() => {
		if (isNavigating) return;
		setIsNavigating(true);

		// Update center date to next span
		const newCenterDate = addDays(centerDate, 3);
		setCenterDate(newCenterDate);
		setSelectedDate(newCenterDate);

		// Scroll to maintain current position after data update
		setTimeout(() => {
			flatListRef.current?.scrollToIndex({
				index: CURRENT_INDEX,
				animated: true,
			});
			setIsNavigating(false);
		}, 50);
	}, [isNavigating, centerDate]);

	// Navigate to previous span (right arrow / swipe right)
	const handlePreviousWeek = useCallback(() => {
		if (isNavigating) return;
		setIsNavigating(true);

		// Update center date to previous span
		const newCenterDate = addDays(centerDate, -3);
		setCenterDate(newCenterDate);
		setSelectedDate(newCenterDate);

		// Scroll to maintain current position after data update
		setTimeout(() => {
			flatListRef.current?.scrollToIndex({
				index: CURRENT_INDEX,
				animated: true,
			});
			setIsNavigating(false);
		}, 50);
	}, [isNavigating, centerDate]);

	// Handle swipe gestures
	const handleMomentumScrollEnd = useCallback(
		(event: any) => {
			if (isNavigating) return;

			const contentOffsetX = event.nativeEvent.contentOffset.x;
			const newIndex = Math.round(contentOffsetX / CARD_CONTAINER_WIDTH);

			if (newIndex !== CURRENT_INDEX) {
				const direction = newIndex > CURRENT_INDEX ? 1 : -1;
				const newCenterDate = addDays(centerDate, direction * 3);

				setIsNavigating(true);
				setCenterDate(newCenterDate);
				setSelectedDate(newCenterDate);

				// Reset to center position after data update
				setTimeout(() => {
					flatListRef.current?.scrollToIndex({
						index: CURRENT_INDEX,
						animated: false,
					});
					setIsNavigating(false);
				}, 50);
			}
		},
		[centerDate, isNavigating]
	);

	// Get formatted month and year for header
	const formattedDate = getFormattedMonthYear(centerDate);
	const [monthName, year] = formattedDate.split(" ");

	// Render each span
	const renderSpan = useCallback(
		({ item }: { item: SpanData }) => (
			<View className="flex-row py-2" style={{ width: CARD_CONTAINER_WIDTH }}>
				{item.days.map((day, index) => (
					<DayCard
						key={day.date.toISOString()}
						day={day}
						onPress={handleDateSelect}
						isMiddleCard={index === 1}
					/>
				))}
			</View>
		),
		[handleDateSelect]
	);

	const getItemLayout = useCallback(
		(_: any, index: number) => ({
			length: CARD_CONTAINER_WIDTH,
			offset: CARD_CONTAINER_WIDTH * index,
			index,
		}),
		[]
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

			{/* Calendar FlatList */}
			<View className="mb-[-24px]">
				<View className="mx-4" style={{ height: 210, paddingVertical: 8 }}>
					<Animated.FlatList
						ref={flatListRef}
						data={spans}
						renderItem={renderSpan}
						keyExtractor={(item) => item.id}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						initialScrollIndex={CURRENT_INDEX}
						getItemLayout={getItemLayout}
						onMomentumScrollEnd={handleMomentumScrollEnd}
						scrollEnabled={!isNavigating}
						decelerationRate="fast"
						snapToInterval={CARD_CONTAINER_WIDTH}
						snapToAlignment="start"
						contentContainerStyle={{
							paddingHorizontal: 0,
						}}
					/>
				</View>
			</View>

			{/* Exercise List for Selected Day */}
			<ExerciseList workout={selectedWorkout} isVisible={true} />
		</View>
	);
}
