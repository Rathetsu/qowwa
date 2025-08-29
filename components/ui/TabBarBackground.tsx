import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

// Custom tab bar background with gradient for web and Android
export default function TabBarBackground() {
	return (
		<LinearGradient
			colors={["#0f172a", "#111827", "#1a1a2e"]}
			start={[0, 0]}
			end={[1, 1]}
			style={StyleSheet.absoluteFill}
		/>
	);
}

export function useBottomTabOverflow() {
	return 0;
}
