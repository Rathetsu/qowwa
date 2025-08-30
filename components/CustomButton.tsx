import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from "react-native";

import { Colors } from "@/constants/Colors";

interface CustomButtonProps extends TouchableOpacityProps {
	title: string;
	variant?:
		| "primary"
		| "secondary"
		| "outline"
		| "gradient"
		| "glass"
		| "premium"
		| "gold"
		| "dark";
	size?: "small" | "medium" | "large";
	textClassName?: string;
	gradientColors?: string[];
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	glowing?: boolean;
}

const variantStyles = {
	primary: "bg-gold-500 border-gold-600 shadow-2xl shadow-gold-500/30",
	secondary: "bg-grey-800 border-grey-700 shadow-lg shadow-black/50",
	outline:
		"bg-transparent border-2 border-gold-500 shadow-lg shadow-gold-500/20",
	gradient: "border-transparent shadow-2xl shadow-gold-500/40",
	glass: "bg-black/30 border border-white/20 shadow-2xl shadow-black/50",
	premium: "border-transparent shadow-2xl shadow-gold-500/50",
	gold: "bg-gold-500 border-gold-600 shadow-2xl shadow-gold-500/40",
	dark: "bg-grey-900 border-grey-800 shadow-xl shadow-black/60",
};

const sizeStyles = {
	small: "px-4 py-2.5 rounded-xl",
	medium: "px-6 py-3.5 rounded-2xl",
	large: "px-8 py-4 rounded-2xl",
};

const textVariantStyles = {
	primary: "text-black font-bold",
	secondary: "text-white font-bold",
	outline: "text-gold-400 font-bold",
	gradient: "text-white font-bold",
	glass: "text-white font-bold",
	premium: "text-white font-bold",
	gold: "text-black font-bold",
	dark: "text-white font-bold",
};

const textSizeStyles = {
	small: "text-sm",
	medium: "text-base",
	large: "text-lg",
};

export default function CustomButton({
	title,
	variant = "primary",
	size = "medium",
	className,
	textClassName,
	gradientColors,
	iconLeft,
	iconRight,
	glowing = false,
	...props
}: CustomButtonProps) {
	const getGradientColors = (colors?: string[]) => {
		if (colors && colors.length >= 2) {
			return colors;
		}

		// Default gradients based on variant
		switch (variant) {
			case "gold":
			case "primary":
				return Colors.theme.gradientGoldPrimary;
			case "premium":
				return Colors.theme.gradientGoldSecondary;
			case "dark":
			case "secondary":
				return Colors.theme.gradientDarkElevated;
			default:
				return Colors.theme.gradientGoldPrimary;
		}
	};

	const buttonClasses = [
		"items-center justify-center flex-row transition-all duration-200",
		variant === "gradient" || variant === "premium" || variant === "gold"
			? ""
			: variantStyles[variant],
		sizeStyles[size],
		glowing ? "animate-pulse" : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	const textClasses = [
		textVariantStyles[variant],
		textSizeStyles[size],
		"font-extrabold tracking-wide",
		textClassName,
	]
		.filter(Boolean)
		.join(" ");

	const contentClasses = "flex-row items-center justify-center space-x-2";

	// Enhanced gradient variants
	if (variant === "gradient" || variant === "premium" || variant === "gold") {
		const gradientColorsArray = getGradientColors(gradientColors);

		return (
			<TouchableOpacity {...props} activeOpacity={0.8}>
				<LinearGradient
					colors={gradientColorsArray}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={{
						borderRadius: size === "small" ? 12 : 16,
						paddingHorizontal:
							size === "small" ? 16 : size === "medium" ? 24 : 32,
						paddingVertical:
							size === "small" ? 10 : size === "medium" ? 14 : 16,
					}}
				>
					<View className={contentClasses}>
						{iconLeft && <View className="mr-2">{iconLeft}</View>}
						<Text className={textClasses}>{title}</Text>
						{iconRight && <View className="ml-2">{iconRight}</View>}
					</View>

					{/* Enhanced glow overlay */}
					{glowing && (
						<LinearGradient
							colors={[
								"rgba(255,255,255,0.2)",
								"transparent",
								"rgba(255,255,255,0.2)",
							]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								borderRadius: size === "small" ? 12 : 16,
							}}
						/>
					)}

					{/* Subtle inner glow for premium effect */}
					{variant === "premium" && (
						<View
							style={{
								position: "absolute",
								top: 1,
								left: 1,
								right: 1,
								bottom: 1,
								borderRadius: size === "small" ? 11 : 15,
								backgroundColor: "rgba(255,255,255,0.1)",
							}}
						/>
					)}
				</LinearGradient>
			</TouchableOpacity>
		);
	}

	return (
		<TouchableOpacity className={buttonClasses} {...props} activeOpacity={0.8}>
			<View className={contentClasses}>
				{iconLeft && <View className="mr-2">{iconLeft}</View>}
				<Text className={textClasses}>{title}</Text>
				{iconRight && <View className="ml-2">{iconRight}</View>}
			</View>

			{/* Enhanced border glow effect for outline variant */}
			{variant === "outline" && glowing && (
				<View className="absolute inset-0 border-2 border-gold-400/60 rounded-2xl animate-pulse" />
			)}
		</TouchableOpacity>
	);
}
