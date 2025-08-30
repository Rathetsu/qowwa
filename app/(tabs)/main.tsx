import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { Calendar } from "@/components/calendar";
import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";

export default function MainScreen() {
	const user = useSelector((state: RootState) => {
		try {
			return state?.user?.user ?? null;
		} catch (e: any) {
			console.warn("Redux state not available, defaulting to null user");
			return e;
		}
	});

	const handleDateSelect = (date: Date) => {
		console.log("Selected date:", date);
		// Here you can add logic to handle date selection
		// such as updating global state, analytics, etc.
	};

	return (
		<>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<LinearGradient
				colors={Colors.theme.gradientDarkPrimary as any}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{ flex: 1 }}
			>
				<SafeAreaView className="flex-1">
					{/* Welcome Section*/}
					<View className="px-6 pt-4 pb-2 relative">
						{/* Subtle gold accent line */}
						<View className="absolute top-0 left-6 right-6 h-0.5 bg-gold-500/30" />

						<Text className="text-white text-3xl font-bold tracking-wide">
							Hi{" "}
							<Text className="text-gold-400">{user?.username || "Guest"}</Text>
							, welcome back!
						</Text>
						<Text className="text-grey-300 text-base mt-2 font-medium">
							Ready to{" "}
							<Text className="text-gold-400 font-semibold">crush</Text> your
							workout today?
						</Text>

						{/* Decorative elements */}
						<View className="absolute -top-2 -right-2 w-3 h-3 bg-gold-500/40 rounded-full animate-pulse" />
						<View className="absolute -bottom-1 -left-1 w-2 h-2 bg-gold-400/30 rounded-full animate-bounce" />
					</View>

					<ScrollView
						className="flex-1"
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingBottom: 140 }} // Extra padding for tab bar
					>
						{/* Calendar */}
						<View className="relative">
							<Calendar
								onDateSelect={handleDateSelect}
								initialDate={new Date()}
							/>
						</View>
					</ScrollView>
				</SafeAreaView>

				{/* background effects */}
				<LinearGradient
					colors={["transparent", "rgba(245, 158, 11, 0.03)", "transparent"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						pointerEvents: "none",
					}}
				/>
			</LinearGradient>
		</>
	);
}
