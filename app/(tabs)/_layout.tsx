import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { useSelector } from "react-redux";

import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { RootState } from "@/store";

export default function TabLayout() {
	const router = useRouter();
	const isAuthenticated = useSelector(
		(state: RootState) => state.user.isAuthenticated
	);

	// Redirect to login if not authenticated
	useEffect(() => {
		if (!isAuthenticated) {
			router.replace("/login");
		}
	}, [isAuthenticated, router]);

	// Don't render tabs if not authenticated
	if (!isAuthenticated) {
		return null;
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#22d3ee", // Bright cyan for active tabs
				tabBarInactiveTintColor: "#64748b", // Slate gray for inactive tabs
				headerShown: false,

				tabBarBackground: TabBarBackground,
				tabBarStyle: {
					backgroundColor: "transparent", // Let the gradient background show through
					borderTopColor: "rgba(34, 211, 238, 0.4)", // Subtle cyan border
					borderTopWidth: 1,
					elevation: 0, // Remove shadow on Android
					shadowOpacity: 0, // Remove shadow on iOS
					height: 85, // Increased height for better proportions
					paddingTop: 8,
					paddingBottom: 12,
					...Platform.select({
						ios: {
							position: "absolute",
						},
						default: {},
					}),
				},
				tabBarLabelStyle: {
					fontSize: 13,
					fontWeight: "700",
					marginBottom: 2,
					marginTop: 4,
				},
				tabBarIconStyle: {
					marginTop: 2,
				},
			}}
		>
			<Tabs.Screen
				name="main"
				options={{
					title: "Main",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={30} name="flame.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="dashboard"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={30} name="house.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="workouts"
				options={{
					title: "Training",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={30} name="dumbbell.fill" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
