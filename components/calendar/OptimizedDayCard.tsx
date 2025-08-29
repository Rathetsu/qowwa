import { LinearGradient } from "expo-linear-gradient";
import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { DayCardProps } from "@/types/calendar";
import { precomputeDayCardStyles } from "@/utils/calendarPerformance";

const OptimizedDayCard = memo(function OptimizedDayCard({
	day,
	onPress,
	isMiddleCard = false,
}: DayCardProps) {
	// Pre-compute all styles for maximum performance
	const styles = precomputeDayCardStyles(day);

	const handlePress = () => {
		onPress(day.date);
	};

	const cardScale = isMiddleCard && day.isSelected ? "scale-105" : "scale-100";
	const cardOpacity =
		!isMiddleCard && !day.isSelected ? "opacity-75" : "opacity-100";

	const shadowStyle = {
		shadowColor: day.isSelected ? "#22d3ee" : "#000000",
		shadowOffset: { width: 0, height: day.isSelected ? 8 : 4 },
		shadowOpacity: day.isSelected ? 0.4 : 0.2,
		shadowRadius: day.isSelected ? 12 : 6,
		marginHorizontal: 6,
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.8}
			className={`flex-1 ${cardScale} ${cardOpacity} transition-all duration-300`}
			style={shadowStyle}
		>
			<View className={`rounded-3xl p-5 h-36 ${styles.cardStyle}`}>
				{/* Day of week */}
				<Text
					className={`text-sm font-bold text-center mb-2 uppercase tracking-wider ${styles.textColor}`}
				>
					{day.dayOfWeek}
				</Text>

				{/* Day number */}
				<Text
					className={`text-4xl font-black text-center mb-3 ${styles.textColor}`}
				>
					{day.dayNumber}
				</Text>

				{/* Workout indicator */}
				{day.workout && (
					<View className="flex-1 justify-center">
						{day.workout.isRestDay ? (
							<View className="bg-gray-600/40 rounded-xl px-3 py-2 border border-gray-500/30">
								<Text
									className={`text-xs font-bold text-center ${styles.workoutTextColor}`}
								>
									{day.workout.name}
								</Text>
							</View>
						) : (
							<LinearGradient
								colors={[day.workout.color, `${day.workout.color}DD`]}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
								className="rounded-xl px-3 py-2"
								style={{ borderRadius: 12 }}
							>
								<Text className="text-xs font-bold text-center text-white shadow-sm">
									{day.workout.name}
								</Text>
							</LinearGradient>
						)}
					</View>
				)}

				{/* Selection indicator dot */}
				{day.isSelected && (
					<View className="absolute top-3 right-3">
						<View className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg" />
					</View>
				)}

				{/* Today indicator */}
				{day.isToday && !day.isSelected && (
					<View className="absolute top-3 right-3">
						<View className="w-3 h-3 bg-cyan-300 rounded-full animate-pulse shadow-lg" />
					</View>
				)}

				{/* Subtle glow effect for selected card */}
				{day.isSelected && (
					<LinearGradient
						colors={[
							"rgba(34, 211, 238, 0.15)",
							"transparent",
							"rgba(34, 211, 238, 0.15)",
						]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						className="absolute inset-0 rounded-3xl"
						style={{ borderRadius: 24 }}
						pointerEvents="none"
					/>
				)}
			</View>
		</TouchableOpacity>
	);
});

export default OptimizedDayCard;
