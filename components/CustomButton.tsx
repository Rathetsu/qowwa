import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
	title: string;
	variant?:
		| "primary"
		| "secondary"
		| "outline"
		| "gradient"
		| "glass"
		| "premium";
	size?: "small" | "medium" | "large";
	textClassName?: string;
	gradientColors?: string[];
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	glowing?: boolean;
}

const variantStyles = {
	primary: "bg-blue-600 border-blue-500 shadow-lg",
	secondary: "bg-gray-600 border-gray-500 shadow-lg",
	outline: "bg-transparent border-2 border-cyan-500 shadow-lg",
	gradient: "border-transparent shadow-2xl",
	glass: "bg-black/20 border border-white/20 shadow-2xl",
	premium:
		"bg-gradient-to-r from-cyan-500 to-blue-600 border-transparent shadow-2xl",
};

const sizeStyles = {
	small: "px-4 py-2.5 rounded-xl",
	medium: "px-6 py-3.5 rounded-2xl",
	large: "px-8 py-4 rounded-2xl",
};

const textVariantStyles = {
	primary: "text-white font-bold",
	secondary: "text-white font-bold",
	outline: "text-cyan-400 font-bold",
	gradient: "text-white font-bold",
	glass: "text-white font-bold",
	premium: "text-white font-bold",
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
	gradientColors = ["#06b6d4", "#3b82f6"],
	iconLeft,
	iconRight,
	glowing = false,
	...props
}: CustomButtonProps) {
	const getGradientClass = (colors: string[]) => {
		if (colors[0] === "#06b6d4" && colors[1] === "#3b82f6") {
			return "bg-gradient-to-r from-cyan-500 to-blue-600";
		}
		if (colors[0] === "#8b5cf6" && colors[1] === "#ec4899") {
			return "bg-gradient-to-r from-purple-500 to-pink-500";
		}
		if (colors[0] === "#10b981" && colors[1] === "#059669") {
			return "bg-gradient-to-r from-emerald-500 to-green-600";
		}
		if (colors[0] === "#dc2626" && colors[1] === "#ea580c") {
			return "bg-gradient-to-r from-red-600 to-orange-600";
		}
		return "bg-gradient-to-r from-cyan-500 to-blue-600";
	};

	const buttonClasses = [
		"items-center justify-center flex-row transition-all duration-200",
		variant === "gradient"
			? getGradientClass(gradientColors)
			: variantStyles[variant],
		sizeStyles[size],
		glowing && variant !== "outline" ? "animate-pulse" : "",
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

	if (variant === "gradient" || variant === "premium") {
		const gradientColorsArray =
			variant === "premium"
				? ["#06b6d4", "#0891b2", "#0e7490"]
				: [gradientColors[0] || "#06b6d4", gradientColors[1] || "#3b82f6"];

		return (
			<TouchableOpacity {...props} activeOpacity={0.8}>
				<LinearGradient
					colors={gradientColorsArray}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					className={sizeStyles[size]}
					style={{ borderRadius: size === "small" ? 12 : 16 }}
				>
					<View className={contentClasses}>
						{iconLeft && <View className="mr-2">{iconLeft}</View>}
						<Text className={textClasses}>{title}</Text>
						{iconRight && <View className="ml-2">{iconRight}</View>}
					</View>
					{/* Subtle glow overlay for premium buttons */}
					{variant === "premium" && glowing && (
						<LinearGradient
							colors={[
								"rgba(255,255,255,0.1)",
								"transparent",
								"rgba(255,255,255,0.1)",
							]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							className="absolute inset-0"
							style={{ borderRadius: size === "small" ? 12 : 16 }}
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
		</TouchableOpacity>
	);
}
