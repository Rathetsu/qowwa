import { DashboardCardProps } from "@/types/type";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function DashboardCard({
	title,
	subtitle,
	icon,
	onPress,
	gradient = ["#1e3a8a", "#3b82f6"],
	variant = "default",
}: DashboardCardProps) {
	const [isPressed, setIsPressed] = useState(false);

	const getGradientColors = (colors: readonly string[]): string[] => {
		// Convert the provided colors to the LinearGradient format
		return colors.length >= 2 ? [colors[0], colors[1]] : ["#06b6d4", "#3b82f6"];
	};

	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.9}
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
		>
			<LinearGradient
				colors={getGradientColors(gradient) as any}
				start={[0, 0]}
				end={[1, 0]}
				style={{
					borderRadius: 24,
					padding: 24,
					marginBottom: 16,
					overflow: "hidden",
					position: "relative",
					transform: isPressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
				}}
			>
				{/* Background overlay for depth */}
				<View
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(0, 0, 0, 0.1)",
						borderRadius: 24,
					}}
				/>

				{/* Main content */}
				<View className="relative z-10">
					<View className="flex-row items-center justify-between mb-4">
						<View className="flex-1 pr-4">
							<Text className="text-white text-xl font-bold mb-2 leading-tight">
								{title}
							</Text>
							<Text className="text-white/90 text-sm font-medium leading-relaxed">
								{subtitle}
							</Text>
						</View>
						<View className="relative">
							<View className="absolute -inset-2 bg-white/20 rounded-full" />
							<View className="relative bg-white/10 rounded-full p-3 animate-pulse">
								<Text className="text-4xl">{icon}</Text>
							</View>
						</View>
					</View>

					{/* Enhanced progress bar with animation */}
					<View className="relative">
						<View className="h-2 bg-black/20 rounded-full overflow-hidden">
							<LinearGradient
								colors={
									[
										"rgba(255, 255, 255, 0.6)",
										"rgba(255, 255, 255, 0.8)",
										"rgba(255, 255, 255, 0.6)",
									] as any
								}
								start={[0, 0]}
								end={[1, 0]}
								style={{
									height: "100%",
									width: "40%",
									borderRadius: 8,
								}}
							/>
						</View>
						{/* Glow effect */}
						<View className="absolute inset-0 h-2 bg-white/10 rounded-full animate-pulse" />
					</View>

					{/* Floating particles effect */}
					<View className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full animate-bounce" />
					<View className="absolute bottom-8 left-4 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
					<View
						className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce"
						style={{ animationDelay: "1s" }}
					/>
				</View>

				{/* Subtle overlay for premium effect */}
				<View className="absolute inset-0 rounded-3xl bg-white/5 opacity-20 pointer-events-none" />
			</LinearGradient>
		</TouchableOpacity>
	);
}
