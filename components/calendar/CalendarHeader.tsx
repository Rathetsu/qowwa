import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { CalendarHeaderProps } from "@/types/calendar";

export default function CalendarHeader({
	currentMonth,
	currentYear,
	onPreviousWeek,
	onNextWeek,
}: CalendarHeaderProps) {
	return (
		<View className="flex-row items-center justify-between px-6 pt-4 pb-6">
			{/* Previous Week Button */}
			<TouchableOpacity
				onPress={onPreviousWeek}
				className="bg-white/15 border border-white/25 rounded-2xl p-4 shadow-xl backdrop-blur-sm"
				activeOpacity={0.7}
				style={{
					shadowColor: "#22d3ee",
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.3,
					shadowRadius: 8,
				}}
			>
				<IconSymbol name="chevron.left" size={24} color="#22d3ee" />
			</TouchableOpacity>

			{/* Month and Year Display */}
			<View className="flex-1 items-center mx-4">
				<Text className="text-white text-3xl font-bold tracking-wide mb-1">
					{currentMonth} {currentYear}
				</Text>
				<View className="w-20 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
			</View>

			{/* Next Week Button */}
			<TouchableOpacity
				onPress={onNextWeek}
				className="bg-white/15 border border-white/25 rounded-2xl p-4 shadow-xl backdrop-blur-sm"
				activeOpacity={0.7}
				style={{
					shadowColor: "#22d3ee",
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.3,
					shadowRadius: 8,
				}}
			>
				<IconSymbol name="chevron.right" size={24} color="#22d3ee" />
			</TouchableOpacity>
		</View>
	);
}
