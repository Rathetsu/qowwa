import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "@/components/CustomButton";
import DashboardCard from "@/components/DashboardCard";
import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import { logout } from "@/store/userSlice";

export default function HomeScreen() {
	const user = useSelector((state: RootState) => {
		try {
			return state?.user?.user ?? null;
		} catch (error) {
			console.warn("Redux state not available, defaulting to null user");
			return null;
		}
	});
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
			colors={Colors.theme.gradientDarkPrimary} // Stunning black to dark grey
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{ flex: 1, paddingTop: insets.top }}
		>
			{/* Enhanced animated background elements with gold accents */}
			<View className="absolute inset-0">
				<View className="absolute top-10 right-20 w-40 h-40 bg-gold-500/8 rounded-full blur-2xl animate-float" />
				<View className="absolute bottom-40 left-10 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl animate-pulse" />
				<View className="absolute top-1/3 left-1/4 w-24 h-24 bg-gold-300/3 rounded-full blur-xl animate-bounce" />
			</View>

			<ScrollView
				className="flex-1 px-6 pt-6"
				showsVerticalScrollIndicator={false}
			>
				{/* Enhanced Premium Header with golden accents */}
				<View className="flex-row justify-between items-center mb-10 animate-fade-in-up">
					<View className="flex-1">
						<Text className="text-white text-3xl font-black mb-1 tracking-wide">
							Welcome back,
						</Text>
						<Text className="text-gold-400 text-2xl font-bold mb-2">
							{user?.username}! 💪
						</Text>
						<Text className="text-grey-300 text-base font-medium">
							Ready to{" "}
							<Text className="text-gold-300 font-semibold">dominate</Text> your
							workout?
						</Text>
						{/* Subtle gold accent line */}
						<View className="mt-3 h-1 w-16 bg-gold-500/60 rounded-full" />
					</View>
					<CustomButton
						title="Logout"
						onPress={handleLogout}
						variant="outline"
						size="small"
						className="border-gold-500/60 shadow-lg shadow-gold-500/20"
						textClassName="text-gold-400 font-bold"
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
						variant="gold"
					/>

					<DashboardCard
						title="Progress Tracking"
						subtitle="Monitor your strength gains and goals"
						icon="📊"
						onPress={() => {}} // Placeholder
						variant="dark"
					/>

					<DashboardCard
						title="Nutrition"
						subtitle="Track your macros and meal plans"
						icon="🥗"
						onPress={() => {}} // Placeholder
						variant="premium"
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
						<View className="bg-gold-500/20 px-3 py-1 rounded-full border border-gold-500/30">
							<Text className="text-gold-300 text-xs font-bold">
								TRENDING UP
							</Text>
						</View>
					</View>

					<View className="bg-black/30 border border-gold-500/20 rounded-3xl p-6 shadow-2xl overflow-hidden">
						{/* Enhanced background gradient overlay with gold */}
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
											<View className="w-2 h-2 bg-gold-400 rounded-full mr-2" />
											<Text className="text-grey-400 text-sm">
												Personal Record
											</Text>
										</View>
									</View>
									<View className="items-end">
										<Text className="text-gold-400 text-lg font-bold">
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
