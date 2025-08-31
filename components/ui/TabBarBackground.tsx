import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";

// Stunning tab bar background with black to dark grey gradient and subtle gold accents
export default function TabBarBackground() {
	return (
		<View style={StyleSheet.absoluteFill}>
			{/* Main background gradient */}
			<LinearGradient
				colors={[
					Colors.theme.surfacePrimary, // Pure black
					Colors.theme.surfaceSecondary, // Deep black
					Colors.theme.surfaceTertiary, // Dark grey
				]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={StyleSheet.absoluteFill}
			/>
			{/* Subtle gold accent overlay for visual depth */}
			<LinearGradient
				colors={[
					"rgba(245, 158, 11, 0.08)", // Subtle gold at top
					"transparent", // Transparent middle
					"rgba(245, 158, 11, 0.12)", // Slightly more gold at bottom
				]}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={[
					StyleSheet.absoluteFill,
					{
						borderTopWidth: 1.5,
						borderTopColor: Colors.theme.borderAccent + "35", // Enhanced gold border
					},
				]}
			/>
			{/* Additional subtle highlight for premium feel */}
			<View
				style={[
					StyleSheet.absoluteFill,
					{
						borderTopWidth: 0.5,
						borderTopColor: Colors.theme.textAccent + "20", // Very subtle gold highlight
						top: 1, // Offset to create layered effect
					},
				]}
			/>
		</View>
	);
}

export function useBottomTabOverflow() {
	return 0;
}
