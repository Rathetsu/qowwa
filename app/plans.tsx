import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PlansScreen() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	return (
		<View
			className="flex-1 bg-gradient-to-br from-slate-900 via-gray-900 to-black"
			style={{ paddingTop: insets.top }}
		>
			{/* Animated background elements */}
			<View className="absolute inset-0">
				<View className="absolute top-40 right-10 w-56 h-56 bg-cyan-500/5 rounded-full blur-3xl animate-float" />
				<View className="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
				<View
					className="absolute top-20 left-1/2 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl animate-float"
					style={{ animationDelay: "1s" }}
				/>
			</View>

			<View className="flex-1 px-6 pt-6">
				{/* Premium Header */}
				<View className="flex-row items-center mb-10 animate-fade-in-up">
					<TouchableOpacity
						onPress={() => router.back()}
						className="mr-4 p-3 bg-white/10 rounded-2xl border border-white/20"
					>
						<Text className="text-cyan-400 text-xl font-bold">←</Text>
					</TouchableOpacity>
					<View>
						<Text className="text-white text-2xl font-black tracking-wide">
							Exercise Plans
						</Text>
						<Text className="text-cyan-400 text-sm font-medium">
							Your personalized fitness journey
						</Text>
					</View>
				</View>

				{/* Premium Coming Soon Content */}
				<View className="flex-1 justify-center items-center px-4">
					<View className="bg-black/20 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative max-w-md w-full transition-all duration-300">
						{/* Background gradient overlay */}
						<View className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl" />

						{/* Main content */}
						<View className="relative z-10 items-center">
							{/* Premium icon container */}
							<View className="relative mb-8">
								<View className="absolute -inset-4 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-full blur-lg" />
								<View className="relative bg-white/10 rounded-full p-6 animate-bounce">
									<Text className="text-8xl text-center">🏗️</Text>
								</View>
							</View>

							{/* Title and description */}
							<Text className="text-white text-2xl font-black text-center mb-3 tracking-wide">
								Coming Soon
							</Text>
							<Text className="text-cyan-400 text-lg font-bold text-center mb-6">
								Revolutionary Fitness Planning
							</Text>
							<Text className="text-white/80 text-center text-base leading-7 mb-8">
								Our exercise plan builder is being crafted with cutting-edge AI
								to deliver personalized workout routines tailored just for you.
							</Text>

							{/* Premium features preview */}
							<View className="w-full space-y-4 mb-8">
								{[
									{
										icon: "🎯",
										title: "Custom workout routines",
										desc: "AI-generated plans",
									},
									{
										icon: "📚",
										title: "Exercise library",
										desc: "1000+ movements",
									},
									{
										icon: "📈",
										title: "Progress tracking",
										desc: "Real-time analytics",
									},
									{
										icon: "🤖",
										title: "AI recommendations",
										desc: "Smart adaptations",
									},
								].map((feature, index) => (
									<View
										key={index}
										className="flex-row items-center p-4 bg-white/5 rounded-2xl border border-white/10"
									>
										<View className="relative mr-4">
											<View className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-sm" />
											<View className="relative bg-cyan-500/20 rounded-full p-2">
												<Text className="text-xl">{feature.icon}</Text>
											</View>
										</View>
										<View className="flex-1">
											<Text className="text-white font-bold text-sm mb-1">
												{feature.title}
											</Text>
											<Text className="text-white/60 text-xs">
												{feature.desc}
											</Text>
										</View>
										<View className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
									</View>
								))}
							</View>

							{/* Progress indicator */}
							<View className="w-full">
								<View className="flex-row items-center justify-between mb-2">
									<Text className="text-white/70 text-sm font-medium">
										Development Progress
									</Text>
									<Text className="text-cyan-400 text-sm font-bold">75%</Text>
								</View>
								<View className="h-2 bg-white/10 rounded-full overflow-hidden">
									<View className="h-full w-3/4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
								</View>
							</View>
						</View>

						{/* Subtle overlay */}
						<View className="absolute inset-0 rounded-3xl bg-white/5 opacity-20 pointer-events-none" />
					</View>

					{/* Additional info */}
					<View
						className="mt-8 animate-fade-in-up"
						style={{ animationDelay: "0.2s" }}
					>
						<Text className="text-white/50 text-center text-sm font-medium">
							🚀 Launching in the next major update
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
}
