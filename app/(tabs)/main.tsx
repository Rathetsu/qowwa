import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { Calendar } from "@/components/calendar";
import { RootState } from "@/store";

export default function MainScreen() {
	const user = useSelector((state: RootState) => state.user.user);

	const handleDateSelect = (date: Date) => {
		console.log("Selected date:", date);
		// Here you can add logic to handle date selection
		// such as updating global state, analytics, etc.
	};

	return (
		<>
			<StatusBar barStyle="light-content" />
			<LinearGradient
				colors={["#1e1b4b", "#312e81", "#1e40af"]} // Deep purple to blue gradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{ flex: 1 }}
			>
				<SafeAreaView className="flex-1">
					{/* Welcome Section */}
					<View className="px-6 pt-4 pb-2">
						<Text className="text-white text-2xl font-bold">
							Hi {user?.username || "Guest"}, welcome back!
						</Text>
						<Text className="text-white/70 text-base mt-1">
							Ready to crush your workout today?
						</Text>
					</View>

					<ScrollView
						className="flex-1"
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingBottom: 140 }} // Extra padding for tab bar
					>
						{/* Main Calendar Component */}
						<Calendar
							onDateSelect={handleDateSelect}
							initialDate={new Date()}
						/>
					</ScrollView>
				</SafeAreaView>
			</LinearGradient>
		</>
	);
}
