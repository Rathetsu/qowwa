import { LinearGradient } from "expo-linear-gradient";
import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { DayCardProps } from "@/types/calendar";

const DayCard = memo(function DayCard({
	day,
	onPress,
	isMiddleCard = false,
}: DayCardProps) {
	const handlePress = () => {
		onPress(day.date);
	};

	const cardScale = isMiddleCard && day.isSelected ? "scale-105" : "scale-100";
	const cardOpacity =
		!isMiddleCard && !day.isSelected ? "opacity-75" : "opacity-100";

	// Enhanced shadow styling with gold theme
	const shadowStyle = {
		shadowColor: day.isSelected
			? Colors.theme.shadowGold
			: Colors.theme.shadowDark,
		shadowOffset: { width: 0, height: day.isSelected ? 12 : 6 },
		shadowOpacity: day.isSelected ? 0.6 : 0.3,
		shadowRadius: day.isSelected ? 16 : 8,
		marginHorizontal: 6,
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.8}
			className={`flex-1 ${cardScale} ${cardOpacity} transition-all duration-300`}
			style={shadowStyle}
		>
			{day.isSelected ? (
				<LinearGradient
					colors={Colors.theme.gradientDarkElevated as any}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={{
						borderRadius: 24,
						padding: 20,
						height: 144,
						borderWidth: 2,
						borderColor: Colors.theme.borderAccent + "80",
					}}
				>
					{/* Day of week */}
					<Text className="text-sm font-bold text-center mb-2 uppercase tracking-wider text-gold-300">
						{day.dayOfWeek}
					</Text>

					{/* Day number */}
					<Text className="text-4xl font-black text-center mb-3 text-white">
						{day.dayNumber}
					</Text>

					{/* Workout indicator */}
					{day.workout && (
						<View className="flex-1 justify-center items-center min-h-0">
							{day.workout.isRestDay ? (
								<View className="bg-grey-700/60 rounded-xl px-3 py-2 border border-gold-500/30 max-w-full">
									<Text
										className="text-xs font-bold text-center text-grey-200"
										numberOfLines={2}
										adjustsFontSizeToFit
									>
										{day.workout.name}
									</Text>
								</View>
							) : (
								<LinearGradient
									colors={Colors.theme.gradientGoldPrimary as any}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 1 }}
									style={{
										borderRadius: 12,
										paddingHorizontal: 12,
										paddingVertical: 8,
										maxWidth: "100%",
										minHeight: 32,
										justifyContent: "center",
									}}
								>
									<Text
										className="text-xs font-bold text-center text-black"
										numberOfLines={2}
										adjustsFontSizeToFit
									>
										{day.workout.name}
									</Text>
								</LinearGradient>
							)}
						</View>
					)}

					{/* Selection indicator dot */}
					<View className="absolute top-3 right-3">
						<View
							className="w-4 h-4 rounded-full shadow-lg"
							style={{
								backgroundColor: Colors.theme.primary,
								shadowColor: Colors.theme.primary,
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.8,
								shadowRadius: 6,
							}}
						/>
					</View>

					{/* Enhanced glow effect for selected card */}
					<LinearGradient
						colors={Colors.theme.gradientGoldSubtle as any}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							borderRadius: 24,
						}}
						pointerEvents="none"
					/>
				</LinearGradient>
			) : (
				<View
					className="rounded-3xl p-5 h-36 bg-grey-900/60 border border-grey-700/40"
					style={{
						borderColor: Colors.theme.borderPrimary + "60",
					}}
				>
					{/* Day of week */}
					<Text className="text-sm font-bold text-center mb-2 uppercase tracking-wider text-grey-400">
						{day.dayOfWeek}
					</Text>

					{/* Day number */}
					<Text className="text-4xl font-black text-center mb-3 text-grey-200">
						{day.dayNumber}
					</Text>

					{/* Workout indicator */}
					{day.workout && (
						<View className="flex-1 justify-center items-center min-h-0">
							{day.workout.isRestDay ? (
								<View className="bg-grey-800/80 rounded-xl px-3 py-2 border border-grey-600/50 max-w-full">
									<Text
										className="text-xs font-bold text-center text-grey-200"
										numberOfLines={2}
										adjustsFontSizeToFit
									>
										{day.workout.name}
									</Text>
								</View>
							) : (
								<View
									className="rounded-xl px-3 py-2 border max-w-full"
									style={{
										backgroundColor: Colors.theme.surfaceElevated + "CC",
										borderColor: Colors.theme.borderAccent + "60",
										minHeight: 32,
										justifyContent: "center",
									}}
								>
									<Text
										className="text-xs font-bold text-center"
										style={{ color: Colors.theme.textAccent }}
										numberOfLines={2}
										adjustsFontSizeToFit
									>
										{day.workout.name}
									</Text>
								</View>
							)}
						</View>
					)}

					{/* Today indicator */}
					{day.isToday && (
						<View className="absolute top-3 right-3">
							<View
								className="w-3 h-3 rounded-full animate-pulse shadow-lg"
								style={{
									backgroundColor: Colors.theme.primary + "CC",
									shadowColor: Colors.theme.primary,
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.6,
									shadowRadius: 4,
								}}
							/>
						</View>
					)}
				</View>
			)}
		</TouchableOpacity>
	);
});

export default DayCard;
