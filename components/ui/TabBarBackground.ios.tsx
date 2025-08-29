import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

export default function BlurTabBarBackground() {
	return (
		<View style={StyleSheet.absoluteFill}>
			<LinearGradient
				colors={["#0f172a", "#111827", "#1a1a2e"]}
				start={[0, 0]}
				end={[1, 1]}
				style={StyleSheet.absoluteFill}
			/>
			<BlurView
				// Dark material with reduced intensity for better visibility
				tint="dark"
				intensity={60}
				style={StyleSheet.absoluteFill}
			/>
		</View>
	);
}

export function useBottomTabOverflow() {
	return useBottomTabBarHeight();
}
