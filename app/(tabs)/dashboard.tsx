import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "@/components/CustomButton";
import DashboardCard from "@/components/DashboardCard";
import { RootState } from "@/store";
import { logout } from "@/store/userSlice";

export default function HomeScreen() {
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const handleLogout = () => {
		dispatch(logout());
		router.replace("/login");
	};

	const navigateToPlans = () => {
		router.push("/plans");
	};

	// Mock progress data
	const progressData = [
		{ exercise: "Bench Press", weight: 185, reps: 8 },
		{ exercise: "Deadlift", weight: 275, reps: 5 },
		{ exercise: "Squat", weight: 225, reps: 10 },
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
				<View className="absolute top-10 right-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl animate-float" />
				<View className="absolute bottom-40 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl animate-pulse" />
			</View>

			<ScrollView
				className="flex-1 px-6 pt-6"
				showsVerticalScrollIndicator={false}
			>
				{/* Premium Header */}
				<View className="flex-row justify-between items-center mb-10 animate-fade-in-up">
					<View className="flex-1">
						<Text className="text-white text-3xl font-black mb-1">
							Welcome back,
						</Text>
						<Text className="text-cyan-400 text-2xl font-bold mb-2">
							{user?.username}! 💪
						</Text>
						<Text className="text-white/70 text-base font-medium">
							Ready to dominate your workout?
						</Text>
					</View>
					<CustomButton
						title="Logout"
						onPress={handleLogout}
						variant="outline"
						size="small"
						className="border-red-400/60 shadow-lg shadow-red-400/20"
						textClassName="text-red-400 font-bold"
					/>
				</View>

				{/* Enhanced Dashboard Cards */}
				<View
					className="mb-10 animate-fade-in-up"
					style={{ animationDelay: "0.1s" }}
				>
					<Text className="text-white text-xl font-bold mb-6 tracking-wide">
						🎯 Quick Actions
					</Text>
					<DashboardCard
						title="Exercise Plans"
						subtitle="Create and manage your workout routines"
						icon="💪"
						onPress={navigateToPlans}
						gradient={["#06b6d4", "#3b82f6"]}
						variant="default"
					/>

					<DashboardCard
						title="Progress Tracking"
						subtitle="Monitor your strength gains and goals"
						icon="📊"
						onPress={() => {}} // Placeholder
						gradient={["#8b5cf6", "#ec4899"]}
						variant="default"
					/>

					<DashboardCard
						title="Nutrition"
						subtitle="Track your macros and meal plans"
						icon="🥗"
						onPress={() => {}} // Placeholder
						gradient={["#10b981", "#059669"]}
						variant="default"
					/>
				</View>

				{/* Enhanced Progress Section */}
				<View
					className="mb-10 animate-fade-in-up"
					style={{ animationDelay: "0.2s" }}
				>
					<View className="flex-row items-center justify-between mb-6">
						<Text className="text-white text-xl font-bold tracking-wide">
							📈 Recent Progress
						</Text>
						<View className="bg-cyan-500/20 px-3 py-1 rounded-full">
							<Text className="text-cyan-300 text-xs font-bold">
								TRENDING UP
							</Text>
						</View>
					</View>

					<View className="bg-black/20 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
						{/* Background gradient overlay */}
						<LinearGradient
							colors={["rgba(6, 182, 212, 0.1)", "rgba(139, 92, 246, 0.1)"]}
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
							{progressData.map((item, index) => (
								<View
									key={index}
									className="flex-row justify-between items-center py-4 border-b border-white/10 last:border-b-0"
								>
									<View className="flex-1">
										<Text className="text-white text-base font-bold mb-1">
											{item.exercise}
										</Text>
										<View className="flex-row items-center">
											<View className="w-2 h-2 bg-cyan-400 rounded-full mr-2" />
											<Text className="text-white/60 text-sm">
												Personal Record
											</Text>
										</View>
									</View>
									<View className="items-end">
										<Text className="text-cyan-400 text-lg font-bold">
											{item.weight} lbs
										</Text>
										<Text className="text-white/60 text-sm">
											x {item.reps} reps
										</Text>
									</View>
								</View>
							))}

							{/* Enhanced Progress Chart */}
							<View className="mt-6 h-40 bg-black/20 border border-white/10 rounded-2xl p-4 flex items-center justify-center relative overflow-hidden">
								<LinearGradient
									colors={["rgba(6, 182, 212, 0.2)", "rgba(139, 92, 246, 0.2)"]}
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
								<View className="relative z-10 items-center">
									<Text className="text-4xl mb-2 animate-bounce">📈</Text>
									<Text className="text-white font-bold text-base mb-1">
										Progress Chart
									</Text>
									<Text className="text-white/60 text-sm text-center">
										Advanced analytics coming soon
									</Text>
								</View>
							</View>
						</View>
					</View>
				</View>

				{/* Enhanced Stats Overview */}
				<View
					className="mb-8 animate-fade-in-up"
					style={{ animationDelay: "0.3s" }}
				>
					<Text className="text-white text-xl font-bold mb-6 tracking-wide">
						⚡ This Week
					</Text>
					<View className="flex-row justify-between space-x-3">
						<View className="bg-black/20 border border-white/10 rounded-2xl p-5 flex-1 relative overflow-hidden">
							<LinearGradient
								colors={["rgba(6, 182, 212, 0.2)", "rgba(8, 145, 178, 0.2)"]}
								start={[0, 0]}
								end={[1, 1]}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									borderRadius: 16,
								}}
							/>
							<View className="relative z-10">
								<Text className="text-cyan-400 text-3xl font-black mb-1">
									5
								</Text>
								<Text className="text-white text-sm font-semibold">
									Workouts
								</Text>
								<View className="mt-2 h-1 bg-cyan-500/30 rounded-full">
									<View className="h-full w-4/5 bg-cyan-400 rounded-full" />
								</View>
							</View>
						</View>

						<View className="bg-black/20 border border-white/10 rounded-2xl p-5 flex-1 relative overflow-hidden">
							<LinearGradient
								colors={["rgba(139, 92, 246, 0.2)", "rgba(147, 51, 234, 0.2)"]}
								start={[0, 0]}
								end={[1, 1]}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									borderRadius: 16,
								}}
							/>
							<View className="relative z-10">
								<Text className="text-purple-400 text-3xl font-black mb-1">
									12h
								</Text>
								<Text className="text-white text-sm font-semibold">
									Training
								</Text>
								<View className="mt-2 h-1 bg-purple-500/30 rounded-full">
									<View className="h-full w-3/4 bg-purple-400 rounded-full" />
								</View>
							</View>
						</View>

						<View className="bg-black/20 border border-white/10 rounded-2xl p-5 flex-1 relative overflow-hidden">
							<LinearGradient
								colors={["rgba(16, 185, 129, 0.2)", "rgba(5, 150, 105, 0.2)"]}
								start={[0, 0]}
								end={[1, 1]}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									borderRadius: 16,
								}}
							/>
							<View className="relative z-10">
								<Text className="text-emerald-400 text-3xl font-black mb-1">
									+8
								</Text>
								<Text className="text-white text-sm font-semibold">
									PR Total
								</Text>
								<View className="mt-2 h-1 bg-emerald-500/30 rounded-full">
									<View className="h-full w-full bg-emerald-400 rounded-full" />
								</View>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</LinearGradient>
	);
}
