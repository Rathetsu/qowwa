import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { CalendarHeaderProps } from "@/types/calendar";

export default function CalendarHeader({
	currentMonth,
	currentYear,
	onPreviousWeek,
	onNextWeek,
}: CalendarHeaderProps) {
	return (
		<View className="flex-row items-center justify-between px-6 pt-4 pb-6">
			{/* Enhanced Previous Week Button with gold theme */}
			<TouchableOpacity
				onPress={onPreviousWeek}
				className="bg-black/30 border border-gold-500/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm"
				activeOpacity={0.7}
				style={{
					shadowColor: Colors.theme.shadowGold,
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.4,
					shadowRadius: 12,
				}}
			>
				<IconSymbol
					name="chevron.left"
					size={24}
					color={Colors.theme.primary}
				/>
			</TouchableOpacity>

			{/* Enhanced Month and Year Display with stunning gold accents */}
			<View className="flex-1 items-center mx-4">
				<Text className="text-white text-3xl font-bold tracking-wide mb-2">
					{currentMonth} <Text className="text-gold-400">{currentYear}</Text>
				</Text>
				{/* Beautiful gold gradient accent line */}
				<LinearGradient
					colors={Colors.theme.gradientGoldPrimary}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={{
						height: 3,
						width: 80,
						borderRadius: 6,
						shadowColor: Colors.theme.primary,
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.6,
						shadowRadius: 8,
					}}
				/>
			</View>

			{/* Enhanced Next Week Button with gold theme */}
			<TouchableOpacity
				onPress={onNextWeek}
				className="bg-black/30 border border-gold-500/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm"
				activeOpacity={0.7}
				style={{
					shadowColor: Colors.theme.shadowGold,
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.4,
					shadowRadius: 12,
				}}
			>
				<IconSymbol
					name="chevron.right"
					size={24}
					color={Colors.theme.primary}
				/>
			</TouchableOpacity>
		</View>
	);
}
