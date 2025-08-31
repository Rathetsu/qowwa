import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";

export default function BlurTabBarBackground() {
	return (
		<View style={StyleSheet.absoluteFill}>
			<LinearGradient
				colors={[
					Colors.theme.surfacePrimary, // Pure black
					Colors.theme.surfaceSecondary, // Deep black
					Colors.theme.surfaceTertiary, // Dark grey
				]}
				start={[0, 0]}
				end={[1, 1]}
				style={StyleSheet.absoluteFill}
			/>
			<BlurView
				// Dark material with reduced intensity for better visibility
				tint="dark"
				intensity={40}
				style={StyleSheet.absoluteFill}
			/>
			{/* Subtle gold accent overlay for visual appeal */}
			<LinearGradient
				colors={[
					"rgba(245, 158, 11, 0.05)", // Very subtle gold at top
					"transparent",
					"rgba(245, 158, 11, 0.08)", // Slightly more gold at bottom
				]}
				start={[0, 0]}
				end={[0, 1]}
				style={[
					StyleSheet.absoluteFill,
					{
						borderTopWidth: 1,
						borderTopColor: Colors.theme.borderAccent + "30", // Subtle gold border
					},
				]}
			/>
		</View>
	);
}

export function useBottomTabOverflow() {
	return useBottomTabBarHeight();
}
