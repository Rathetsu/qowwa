import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface CustomInputProps extends TextInputProps {
	label?: string;
	error?: string;
	variant?: "default" | "futuristic" | "glass" | "premium";
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	glowing?: boolean;
}

export default function CustomInput({
	label,
	error,
	variant = "default",
	leftIcon,
	rightIcon,
	className,
	glowing = false,
	...props
}: CustomInputProps) {
	const [isFocused, setIsFocused] = useState(false);

	const inputStyles = {
		default: "bg-gray-100 border-gray-300 text-gray-900",
		futuristic:
			"bg-gray-900/50 border-cyan-500/40 text-white placeholder-gray-400",
		glass: "bg-black/10 border-white/30 text-white placeholder-gray-300",
		premium:
			"bg-gray-800/70 border-cyan-400/60 text-white placeholder-gray-400",
	};

	const labelStyles = {
		default: "text-gray-700",
		futuristic: "text-cyan-300 font-semibold",
		glass: "text-white font-semibold",
		premium: "text-cyan-400 font-bold",
	};

	const focusStyles = {
		default: "border-blue-500 shadow-lg",
		futuristic: "border-cyan-400 shadow-lg animate-pulse",
		glass: "border-white/60 shadow-lg",
		premium: "border-cyan-300 shadow-2xl shadow-cyan-500/20",
	};

	const baseClass = `
    border-2 rounded-2xl px-4 py-4 text-base transition-all duration-300 font-medium
    ${inputStyles[variant]}
    ${leftIcon ? "pl-12" : ""}
    ${rightIcon ? "pr-12" : ""}
    ${error ? "border-red-400 shadow-lg" : ""}
    ${isFocused ? focusStyles[variant] : ""}
    ${glowing && !error ? "animate-pulse" : ""}
    ${className || ""}
  `
		.trim()
		.replace(/\s+/g, " ");

	const containerClass = `
    relative transition-all duration-300
    ${variant === "premium" ? "animate-bounce" : ""}
  `;

	return (
		<View className="mb-6">
			{label && (
				<Text
					className={`mb-3 text-sm font-bold tracking-wide ${labelStyles[variant]}`}
				>
					{label}
				</Text>
			)}
			<View className={containerClass}>
				{variant === "premium" ? (
					<LinearGradient
						colors={
							isFocused
								? ["#1f2937", "#374151", "#111827"]
								: ["#374151", "#1f2937", "#111827"]
						}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						className="rounded-2xl border-2 border-cyan-400/60"
						style={{
							borderColor: isFocused ? "#67e8f9" : "#22d3ee",
							borderWidth: 2,
						}}
					>
						{leftIcon && (
							<View className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
								{leftIcon}
							</View>
						)}
						<TextInput
							className="px-4 py-4 text-base text-white placeholder-gray-400 font-medium bg-transparent"
							style={{
								paddingLeft: leftIcon ? 48 : 16,
								paddingRight: rightIcon ? 48 : 16,
							}}
							placeholderTextColor="#9CA3AF"
							onFocus={(e) => {
								setIsFocused(true);
								props.onFocus?.(e);
							}}
							onBlur={(e) => {
								setIsFocused(false);
								props.onBlur?.(e);
							}}
							{...props}
						/>
						{rightIcon && (
							<View className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
								{rightIcon}
							</View>
						)}
					</LinearGradient>
				) : (
					<>
						{leftIcon && (
							<View className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
								{leftIcon}
							</View>
						)}
						<TextInput
							className={baseClass}
							placeholderTextColor={
								variant === "default" ? "#6B7280" : "#9CA3AF"
							}
							onFocus={(e) => {
								setIsFocused(true);
								props.onFocus?.(e);
							}}
							onBlur={(e) => {
								setIsFocused(false);
								props.onBlur?.(e);
							}}
							{...props}
						/>
						{rightIcon && (
							<View className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
								{rightIcon}
							</View>
						)}

						{/* Subtle overlay for premium variant */}
						{variant === "premium" && isFocused && (
							<View className="absolute inset-0 rounded-2xl bg-white/5 opacity-50 pointer-events-none" />
						)}
					</>
				)}
			</View>

			{error && (
				<View className="mt-2 transition-all duration-300">
					<Text className="text-sm text-red-400 font-medium">⚠️ {error}</Text>
				</View>
			)}
		</View>
	);
}
