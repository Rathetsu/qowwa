import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";

// Stunning tab bar background with black to dark grey gradient and subtle gold accents
export default function TabBarBackground() {
	return (
		<LinearGradient
			colors={[
				Colors.theme.surfacePrimary, // Pure black
				Colors.theme.surfaceSecondary, // Deep black
				Colors.theme.surfaceTertiary, // Dark grey
			]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={[
				StyleSheet.absoluteFill,
				{
					borderTopWidth: 1,
					borderTopColor: Colors.theme.borderAccent + "40", // Subtle gold border
				},
			]}
		/>
	);
}

export function useBottomTabOverflow() {
	return 0;
}
