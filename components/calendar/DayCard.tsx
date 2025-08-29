import { LinearGradient } from "expo-linear-gradient";
import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { DayCardProps } from "@/types/calendar";

const DayCard = memo(function DayCard({
	day,
	onPress,
	isMiddleCard = false,
}: DayCardProps) {
	const handlePress = () => {
		onPress(day.date);
	};

	// Determine card styling based on state
	const getCardStyle = () => {
		if (day.isSelected) {
			// Selected card - bright and prominent
			return "bg-white/20 border-2 border-cyan-400 shadow-2xl backdrop-blur-sm";
		} else if (day.isToday && !day.isSelected) {
			// Today but not selected - subtle highlight
			return "bg-white/10 border border-cyan-300/60 shadow-xl backdrop-blur-sm";
		} else {
			// Regular day
			return "bg-white/8 border border-white/15 shadow-lg backdrop-blur-sm";
		}
	};

	const getTextColor = () => {
		if (day.isSelected) return "text-white";
		if (day.isToday) return "text-cyan-300";
		return "text-gray-300";
	};

	const getWorkoutTextColor = () => {
		if (day.isSelected) return "text-white";
		if (day.isToday) return "text-cyan-200";
		return "text-gray-400";
	};

	const cardScale = isMiddleCard && day.isSelected ? "scale-105" : "scale-100";
	const cardOpacity =
		!isMiddleCard && !day.isSelected ? "opacity-75" : "opacity-100";

	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.8}
			className={`flex-1 ${cardScale} ${cardOpacity} transition-all duration-300`}
			style={{
				shadowColor: day.isSelected ? "#22d3ee" : "#000000",
				shadowOffset: { width: 0, height: day.isSelected ? 8 : 4 },
				shadowOpacity: day.isSelected ? 0.4 : 0.2,
				shadowRadius: day.isSelected ? 12 : 6,
				marginHorizontal: 6, // Horizontal spacing between cards
			}}
		>
			<View className={`rounded-3xl p-5 h-36 ${getCardStyle()}`}>
				{/* Day of week */}
				<Text
					className={`text-sm font-bold text-center mb-2 uppercase tracking-wider ${getTextColor()}`}
				>
					{day.dayOfWeek}
				</Text>

				{/* Day number */}
				<Text
					className={`text-4xl font-black text-center mb-3 ${getTextColor()}`}
				>
					{day.dayNumber}
				</Text>

				{/* Workout indicator */}
				{day.workout && (
					<View className="flex-1 justify-center">
						{day.workout.isRestDay ? (
							<View className="bg-gray-600/40 rounded-xl px-3 py-2 border border-gray-500/30">
								<Text
									className={`text-xs font-bold text-center ${getWorkoutTextColor()}`}
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

export default DayCard;
