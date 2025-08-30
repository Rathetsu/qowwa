import React, { useMemo } from "react";
import { View } from "react-native";

import { CalendarDay, WorkoutDay } from "@/types/calendar";
import { formatDateKey, getThreeDaySpan } from "@/utils/dateUtils";
import DayCard from "./DayCard";

interface CalendarVirtualizerProps {
	centerDate: Date;
	selectedDate: Date;
	workoutSchedule: { [key: string]: WorkoutDay };
	onDateSelect: (date: Date) => void;
	onNavigationComplete: (newCenterDate: Date) => void;
}

interface DaySpanData {
	days: CalendarDay[];
	centerDate: Date;
	key: string;
}

export default function CalendarVirtualizer({
	centerDate,
	selectedDate,
	workoutSchedule,
	onDateSelect,
	onNavigationComplete,
}: CalendarVirtualizerProps) {
	// Pre-compute current day span
	const currentSpan = useMemo(() => {
		return {
			days: getThreeDaySpan(centerDate, selectedDate, workoutSchedule),
			centerDate: centerDate,
			key: formatDateKey(centerDate),
		} as DaySpanData;
	}, [centerDate, selectedDate, workoutSchedule]);

	const renderDaySpan = (span: DaySpanData) => (
		<View key={span.key} className="flex-row py-4">
			{span.days.map((day, index) => (
				<DayCard
					key={day.date.toISOString()}
					day={day}
					onPress={onDateSelect}
					isMiddleCard={index === 1}
				/>
			))}
		</View>
	);

	return (
		<View className="overflow-hidden mx-4" style={{ height: 160 }}>
			{renderDaySpan(currentSpan)}
		</View>
	);
}
