import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { useSelector } from "react-redux";

import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";

export default function TabLayout() {
	const router = useRouter();

	// Use optional chaining and default values to prevent errors
	const isAuthenticated = useSelector((state: RootState) => {
		try {
			return state?.user?.isAuthenticated ?? false;
		} catch (error) {
			console.warn("Redux state not available, defaulting to unauthenticated");
			return false;
		}
	});

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
				tabBarActiveTintColor: Colors.theme.primary, // Stunning gold for active tabs
				tabBarInactiveTintColor: Colors.theme.textTertiary, // Medium grey for inactive tabs
				headerShown: false,

				tabBarBackground: TabBarBackground,
				tabBarStyle: {
					backgroundColor: "transparent", // Let the gradient background show through
					borderTopColor: Colors.theme.borderAccent + "60", // Subtle gold border with opacity
					borderTopWidth: 1.5,
					elevation: 0, // Remove shadow on Android
					shadowOpacity: 0, // Remove shadow on iOS
					height: 90, // Slightly increased height for better proportions
					paddingTop: 10,
					paddingBottom: Platform.OS === "ios" ? 20 : 15,
					...Platform.select({
						ios: {
							position: "absolute",
						},
						default: {},
					}),
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "700",
					marginBottom: 2,
					marginTop: 4,
					letterSpacing: 0.5,
				},
				tabBarIconStyle: {
					marginTop: 2,
					shadowColor: Colors.theme.primary,
					shadowOffset: { width: 0, height: 0 },
					shadowOpacity: 0.3,
					shadowRadius: 4,
				},
				tabBarItemStyle: {
					paddingVertical: 4,
				},
			}}
		>
			<Tabs.Screen
				name="main"
				options={{
					title: "Main",
					tabBarIcon: ({ color, focused }) => (
						<IconSymbol
							size={focused ? 32 : 28}
							name="flame.fill"
							color={focused ? Colors.theme.primary : color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="dashboard"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<IconSymbol
							size={focused ? 32 : 28}
							name="house.fill"
							color={focused ? Colors.theme.primary : color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="workouts"
				options={{
					title: "Training",
					tabBarIcon: ({ color, focused }) => (
						<IconSymbol
							size={focused ? 32 : 28}
							name="dumbbell.fill"
							color={focused ? Colors.theme.primary : color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
