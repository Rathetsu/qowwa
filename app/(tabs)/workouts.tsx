import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DashboardCard from "@/components/DashboardCard";
import { Colors } from "@/constants/Colors";

export default function WorkoutsScreen() {
	const insets = useSafeAreaInsets();

	// Enhanced workout categories with stunning variants
	const workoutCategories = [
		{
			title: "Strength Training",
			subtitle: "Build muscle and increase power",
			icon: "🏋️",
			variant: "gold" as const,
		},
		{
			title: "Cardio Blast",
			subtitle: "Burn calories and improve endurance",
			icon: "🏃",
			variant: "premium" as const,
		},
		{
			title: "Flexibility",
			subtitle: "Improve mobility and recovery",
			icon: "🧘",
			variant: "dark" as const,
		},
		{
			title: "HIIT",
			subtitle: "High-intensity interval training",
			icon: "⚡",
			variant: "gold" as const,
		},
	];

	return (
		<LinearGradient
			colors={Colors.theme.gradientDarkPrimary} // Stunning black to dark grey
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{ flex: 1, paddingTop: insets.top }}
		>
			{/* Enhanced animated background elements with gold accents */}
			<View className="absolute inset-0">
				<View className="absolute top-20 left-10 w-48 h-48 bg-gold-500/6 rounded-full blur-3xl animate-float" />
				<View className="absolute bottom-20 right-20 w-36 h-36 bg-gold-400/4 rounded-full blur-3xl animate-pulse" />
				<View className="absolute top-2/3 right-1/4 w-28 h-28 bg-gold-300/3 rounded-full blur-2xl animate-bounce" />
			</View>

			<ScrollView
				className="flex-1 px-6 pt-6"
				showsVerticalScrollIndicator={false}
			>
				{/* Enhanced Premium Header with golden theme */}
				<View className="mb-10 animate-fade-in-up">
					<Text className="text-white text-3xl font-black mb-2 tracking-wide">
						Workout Categories
					</Text>
					<Text className="text-gold-400 text-lg font-semibold mb-4">
						Choose your <Text className="text-gold-300">training style</Text>
					</Text>
					<LinearGradient
						colors={Colors.theme.gradientGoldPrimary}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
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
							variant={category.variant}
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
						<View className="bg-gold-500/20 px-3 py-1 rounded-full border border-gold-500/30">
							<Text className="text-gold-300 text-xs font-bold">
								READY TO GO
							</Text>
						</View>
					</View>

					<View className="bg-black/30 border border-gold-500/20 rounded-3xl p-6 shadow-2xl overflow-hidden">
						<LinearGradient
							colors={Colors.theme.gradientGoldSubtle}
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
						/>

						<View className="relative z-10 space-y-1">
							{[
								{
									title: "Push-up Challenge",
									duration: "5 minutes",
									level: "Beginner",
									icon: "💪",
									color: "gold",
								},
								{
									title: "Morning Stretch",
									duration: "10 minutes",
									level: "All levels",
									icon: "🧘",
									color: "gold",
								},
								{
									title: "Cardio Blast",
									duration: "15 minutes",
									level: "Intermediate",
									icon: "🔥",
									color: "gold",
								},
							].map((workout, index) => (
								<View
									key={index}
									className="bg-black/20 border border-white/10 rounded-2xl p-4 mb-3 last:mb-0 relative overflow-hidden"
								>
									<LinearGradient
										colors={Colors.theme.gradientGoldSubtle}
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
													<View className="w-2 h-2 bg-gold-400 rounded-full mr-2" />
													<Text className="text-grey-300 text-sm font-medium">
														{workout.duration}
													</Text>
												</View>
												<View className="bg-gold-500/20 px-2 py-1 rounded-full border border-gold-500/30">
													<Text className="text-gold-300 text-xs font-semibold">
														{workout.level}
													</Text>
												</View>
											</View>
										</View>
										<View className="ml-4 relative">
											<View className="absolute -inset-2 bg-gold-500/20 rounded-full blur-sm" />
											<View className="relative bg-gold-500/20 rounded-full p-3 border border-gold-500/30">
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

					<View className="bg-black/30 border border-gold-500/20 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
						<LinearGradient
							colors={Colors.theme.gradientGoldSubtle}
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
						/>

						<View className="relative z-10">
							<View className="flex-row items-center mb-6">
								<View className="relative mr-4">
									<View className="absolute -inset-1 bg-gold-500/30 rounded-full blur-sm" />
									<View className="relative bg-gold-500/20 rounded-full p-3 border border-gold-500/30">
										<Text className="text-3xl animate-bounce">🚀</Text>
									</View>
								</View>
								<View>
									<Text className="text-white text-lg font-bold mb-1">
										Next-Gen Features
									</Text>
									<Text className="text-grey-300 text-sm font-medium">
										Revolutionary{" "}
										<Text className="text-gold-400">fitness technology</Text>
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
										className="flex-row items-center p-3 bg-black/20 border border-gold-500/20 rounded-xl"
									>
										<Text className="text-2xl mr-4">{feature.icon}</Text>
										<View className="flex-1">
											<Text className="text-white font-bold text-sm mb-1">
												{feature.title}
											</Text>
											<Text className="text-grey-400 text-xs">
												{feature.desc}
											</Text>
										</View>
										<View className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
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
