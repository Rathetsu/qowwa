import { DashboardCardProps } from "@/types/type";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/Colors";

export default function DashboardCard({
	title,
	subtitle,
	icon,
	onPress,
	gradient,
	variant = "default",
}: DashboardCardProps) {
	const [isPressed, setIsPressed] = useState(false);

	const getGradientColors = (colors?: readonly string[]): string[] => {
		if (colors && colors.length >= 2) {
			return [colors[0], colors[1]];
		}

		// Default stunning gradients based on variant
		switch (variant) {
			case "gold":
				return Colors.theme.gradientGoldPrimary;
			case "dark":
				return Colors.theme.gradientDarkElevated;
			case "premium":
				return Colors.theme.gradientGoldSecondary;
			default:
				return Colors.theme.gradientDarkSecondary; // Default dark gradient
		}
	};

	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.9}
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
		>
			<LinearGradient
				colors={getGradientColors(gradient)}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{
					borderRadius: 28,
					padding: 24,
					marginBottom: 16,
					overflow: "hidden",
					position: "relative",
					transform: isPressed ? [{ scale: 0.96 }] : [{ scale: 1 }],
					shadowColor: Colors.theme.shadowGold,
					shadowOffset: { width: 0, height: 8 },
					shadowOpacity: 0.3,
					shadowRadius: 16,
					elevation: 12,
				}}
			>
				{/* Enhanced background overlay for depth */}
				<View
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor:
							variant === "gold" ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.3)",
						borderRadius: 28,
					}}
				/>

				{/* Subtle gold border glow */}
				<View
					style={{
						position: "absolute",
						top: 1,
						left: 1,
						right: 1,
						bottom: 1,
						borderRadius: 27,
						borderWidth: 1,
						borderColor: "rgba(245, 158, 11, 0.3)",
					}}
				/>

				{/* Main content */}
				<View className="relative z-10">
					<View className="flex-row items-center justify-between mb-6">
						<View className="flex-1 pr-4">
							<Text className="text-white text-2xl font-bold mb-3 leading-tight tracking-wide">
								{title}
							</Text>
							<Text className="text-grey-200 text-sm font-medium leading-relaxed">
								{subtitle}
							</Text>
						</View>
						<View className="relative">
							{/* Enhanced icon background with gold accent */}
							<View className="absolute -inset-3 bg-gold-500/20 rounded-full animate-pulse" />
							<View className="absolute -inset-2 bg-gold-400/15 rounded-full" />
							<LinearGradient
								colors={["rgba(245, 158, 11, 0.3)", "rgba(217, 119, 6, 0.2)"]}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
								style={{
									borderRadius: 50,
									padding: 16,
								}}
							>
								<Text className="text-5xl">{icon}</Text>
							</LinearGradient>
						</View>
					</View>

					{/* Enhanced progress bar with gold accents */}
					<View className="relative mb-2">
						<View className="h-3 bg-black/40 rounded-full overflow-hidden border border-gold-500/20">
							<LinearGradient
								colors={Colors.theme.gradientGoldPrimary}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
								style={{
									height: "100%",
									width: "45%",
									borderRadius: 12,
								}}
							/>
						</View>
						{/* Enhanced glow effect */}
						<View
							className="absolute inset-0 h-3 rounded-full animate-pulse"
							style={{
								backgroundColor: "rgba(245, 158, 11, 0.15)",
								shadowColor: Colors.theme.primary,
								shadowOffset: { width: 0, height: 0 },
								shadowOpacity: 0.5,
								shadowRadius: 8,
							}}
						/>
					</View>

					{/* Enhanced floating particles with gold theme */}
					<View className="absolute top-3 right-3 w-3 h-3 bg-gold-400/60 rounded-full animate-bounce" />
					<View className="absolute bottom-10 left-6 w-2 h-2 bg-gold-300/40 rounded-full animate-pulse" />
					<View
						className="absolute top-1/3 left-3 w-2 h-2 bg-gold-500/30 rounded-full animate-bounce"
						style={{ animationDelay: "1.5s" }}
					/>
					<View
						className="absolute bottom-1/4 right-8 w-1.5 h-1.5 bg-gold-400/50 rounded-full animate-pulse"
						style={{ animationDelay: "0.5s" }}
					/>
				</View>

				{/* Premium overlay effect with subtle gold tint */}
				<LinearGradient
					colors={[
						"rgba(245, 158, 11, 0.05)",
						"transparent",
						"rgba(245, 158, 11, 0.03)",
					]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						borderRadius: 28,
						pointerEvents: "none",
					}}
				/>
			</LinearGradient>
		</TouchableOpacity>
	);
}
