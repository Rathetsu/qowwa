import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DashboardCard from "@/components/DashboardCard";

export default function WorkoutsScreen() {
	const insets = useSafeAreaInsets();

	// Mock workout categories
	const workoutCategories = [
		{
			title: "Strength Training",
			subtitle: "Build muscle and increase power",
			icon: "🏋️",
			gradient: ["#dc2626", "#ea580c"] as const,
		},
		{
			title: "Cardio Blast",
			subtitle: "Burn calories and improve endurance",
			icon: "🏃",
			gradient: ["#0891b2", "#06b6d4"] as const,
		},
		{
			title: "Flexibility",
			subtitle: "Improve mobility and recovery",
			icon: "🧘",
			gradient: ["#7c3aed", "#a855f7"] as const,
		},
		{
			title: "HIIT",
			subtitle: "High-intensity interval training",
			icon: "⚡",
			gradient: ["#059669", "#10b981"] as const,
		},
	];

	return (
		<LinearGradient
			colors={["#0f172a", "#111827", "#000000"]}
			start={[0, 0]}
			end={[1, 1]}
			style={{ flex: 1, paddingTop: insets.top }}
		>
			{/* Animated background elements */}
			<View className="absolute inset-0">
				<View className="absolute top-20 left-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-float" />
				<View className="absolute bottom-20 right-20 w-36 h-36 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
			</View>

			<ScrollView
				className="flex-1 px-6 pt-6"
				showsVerticalScrollIndicator={false}
			>
				{/* Premium Header */}
				<View className="mb-10 animate-fade-in-up">
					<Text className="text-white text-3xl font-black mb-2 tracking-wide">
						Workout Categories
					</Text>
					<Text className="text-cyan-400 text-lg font-semibold mb-4">
						Choose your training style
					</Text>
					<LinearGradient
						colors={["#22d3ee", "#a855f7"]}
						start={[0, 0]}
						end={[1, 0]}
						style={{ height: 4, width: 80, borderRadius: 8 }}
					/>
				</View>

				{/* Enhanced Workout Categories */}
				<View
					className="mb-10 animate-fade-in-up"
					style={{ animationDelay: "0.1s" }}
				>
					<Text className="text-white text-xl font-bold mb-6 tracking-wide">
						🏋️ Training Programs
					</Text>
					{workoutCategories.map((category, index) => (
						<DashboardCard
							key={index}
							title={category.title}
							subtitle={category.subtitle}
							icon={category.icon}
							onPress={() => {}} // Placeholder
							gradient={category.gradient}
							variant="default"
						/>
					))}
				</View>

				{/* Enhanced Quick Workouts */}
				<View
					className="mb-10 animate-fade-in-up"
					style={{ animationDelay: "0.2s" }}
				>
					<View className="flex-row items-center justify-between mb-6">
						<Text className="text-white text-xl font-bold tracking-wide">
							⚡ Quick Workouts
						</Text>
						<View className="bg-emerald-500/20 px-3 py-1 rounded-full">
							<Text className="text-emerald-300 text-xs font-bold">
								READY TO GO
							</Text>
						</View>
					</View>

					<View className="bg-black/20 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
						<LinearGradient
							colors={["rgba(16, 185, 129, 0.1)", "rgba(6, 182, 212, 0.1)"]}
							start={[0, 0]}
							end={[1, 1]}
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								borderRadius: 24,
							}}
						/>

						<View className="relative z-10 space-y-1">
							{[
								{
									title: "Push-up Challenge",
									duration: "5 minutes",
									level: "Beginner",
									icon: "💪",
									color: "cyan",
								},
								{
									title: "Morning Stretch",
									duration: "10 minutes",
									level: "All levels",
									icon: "🧘",
									color: "purple",
								},
								{
									title: "Cardio Blast",
									duration: "15 minutes",
									level: "Intermediate",
									icon: "🔥",
									color: "emerald",
								},
							].map((workout, index) => (
								<View
									key={index}
									className="bg-black/20 border border-white/10 rounded-2xl p-4 mb-3 last:mb-0 relative overflow-hidden"
								>
									<LinearGradient
										colors={
											workout.color === "cyan"
												? ["rgba(6, 182, 212, 0.2)", "rgba(59, 130, 246, 0.2)"]
												: workout.color === "purple"
													? [
															"rgba(139, 92, 246, 0.2)",
															"rgba(236, 72, 153, 0.2)",
														]
													: [
															"rgba(16, 185, 129, 0.2)",
															"rgba(34, 197, 94, 0.2)",
														]
										}
										start={[0, 0]}
										end={[1, 0]}
										style={{
											position: "absolute",
											top: 0,
											left: 0,
											right: 0,
											bottom: 0,
											borderRadius: 16,
										}}
									/>

									<View className="relative z-10 flex-row justify-between items-center">
										<View className="flex-1">
											<Text className="text-white text-base font-bold mb-2">
												{workout.title}
											</Text>
											<View className="flex-row items-center space-x-4">
												<View className="flex-row items-center">
													<View
														className={`w-2 h-2 ${
															workout.color === "cyan"
																? "bg-cyan-400"
																: workout.color === "purple"
																	? "bg-purple-400"
																	: "bg-emerald-400"
														} rounded-full mr-2`}
													/>
													<Text className="text-white/70 text-sm font-medium">
														{workout.duration}
													</Text>
												</View>
												<View className="bg-white/10 px-2 py-1 rounded-full">
													<Text className="text-white/80 text-xs font-semibold">
														{workout.level}
													</Text>
												</View>
											</View>
										</View>
										<View className="ml-4 relative">
											<View className="absolute -inset-2 bg-white/10 rounded-full blur-sm" />
											<View className="relative bg-white/20 rounded-full p-3">
												<Text className="text-2xl">{workout.icon}</Text>
											</View>
										</View>
									</View>
								</View>
							))}
						</View>
					</View>
				</View>

				{/* Enhanced Coming Soon Section */}
				<View
					className="mb-8 animate-fade-in-up"
					style={{ animationDelay: "0.3s" }}
				>
					<Text className="text-white text-xl font-bold mb-6 tracking-wide">
						🚀 Coming Soon
					</Text>

					<View className="bg-black/20 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
						<LinearGradient
							colors={["rgba(139, 92, 246, 0.2)", "rgba(236, 72, 153, 0.2)"]}
							start={[0, 0]}
							end={[1, 1]}
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								borderRadius: 24,
							}}
						/>

						<View className="relative z-10">
							<View className="flex-row items-center mb-6">
								<View className="relative mr-4">
									<View className="absolute -inset-1 bg-purple-500/30 rounded-full blur-sm" />
									<View className="relative bg-purple-500/20 rounded-full p-3">
										<Text className="text-3xl animate-bounce">🚀</Text>
									</View>
								</View>
								<View>
									<Text className="text-white text-lg font-bold mb-1">
										Next-Gen Features
									</Text>
									<Text className="text-white/70 text-sm font-medium">
										Revolutionary fitness technology
									</Text>
								</View>
							</View>

							<View className="space-y-4">
								{[
									{
										icon: "🏗️",
										title: "Custom workout builder",
										desc: "AI-powered routine creation",
									},
									{
										icon: "🎥",
										title: "Video exercise tutorials",
										desc: "HD form demonstrations",
									},
									{
										icon: "🤖",
										title: "Personal trainer AI",
										desc: "24/7 intelligent coaching",
									},
									{
										icon: "🏆",
										title: "Social workout challenges",
										desc: "Compete with friends globally",
									},
								].map((feature, index) => (
									<View
										key={index}
										className="flex-row items-center p-3 bg-white/5 rounded-xl"
									>
										<Text className="text-2xl mr-4">{feature.icon}</Text>
										<View className="flex-1">
											<Text className="text-white font-bold text-sm mb-1">
												{feature.title}
											</Text>
											<Text className="text-white/60 text-xs">
												{feature.desc}
											</Text>
										</View>
										<View className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
									</View>
								))}
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</LinearGradient>
	);
}
