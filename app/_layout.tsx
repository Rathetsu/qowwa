import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider } from "react-redux";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { store } from "@/store";
import "../global.css";

// Custom dark theme with our stunning black, grey, white, and gold colors
const CustomDarkTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		primary: Colors.theme.primary, // Gold primary
		background: Colors.theme.surfacePrimary, // Pure black
		card: Colors.theme.surfaceTertiary, // Dark grey
		text: Colors.theme.textPrimary, // White text
		border: Colors.theme.borderPrimary, // Dark border
		notification: Colors.theme.primary, // Gold notifications
	},
};

const CustomLightTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: Colors.theme.primary, // Gold primary
		background: Colors.white, // White background
		card: "#f5f5f5", // Light grey
		text: "#171717", // Dark text
		border: "#d4d4d4", // Light border
		notification: Colors.theme.primary, // Gold notifications
	},
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<GestureHandlerRootView
			style={{ flex: 1, backgroundColor: Colors.theme.surfacePrimary }}
		>
			<Provider store={store}>
				<ThemeProvider
					value={colorScheme === "dark" ? CustomDarkTheme : CustomLightTheme}
				>
					<Stack
						screenOptions={{
							headerShown: false,
							contentStyle: { backgroundColor: Colors.theme.surfacePrimary },
							animation: "fade",
						}}
					>
						<Stack.Screen
							name="login"
							options={{
								headerShown: false,
								contentStyle: { backgroundColor: Colors.theme.surfacePrimary },
							}}
						/>
						<Stack.Screen
							name="(tabs)"
							options={{
								headerShown: false,
								contentStyle: { backgroundColor: Colors.theme.surfacePrimary },
							}}
						/>
						<Stack.Screen
							name="plans"
							options={{
								headerShown: false,
								contentStyle: { backgroundColor: Colors.theme.surfacePrimary },
							}}
						/>
						<Stack.Screen name="+not-found" />
					</Stack>
					<StatusBar
						style="light"
						backgroundColor={Colors.theme.surfacePrimary}
						translucent={true}
					/>
				</ThemeProvider>
			</Provider>
		</GestureHandlerRootView>
	);
}
