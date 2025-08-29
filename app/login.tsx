import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { loginStart, loginSuccess } from "@/store/userSlice";
import { LoginCredentials } from "@/types/type";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function LoginScreen() {
	const [credentials, setCredentials] = useState<LoginCredentials>({
		username: "",
		password: "",
	});
	const [errors, setErrors] = useState<Partial<LoginCredentials>>({});
	const insets = useSafeAreaInsets();

	const dispatch = useDispatch();
	const router = useRouter();

	const handleLogin = () => {
		// Reset errors
		setErrors({});

		// Basic validation
		const newErrors: Partial<LoginCredentials> = {};
		if (!credentials.username.trim()) {
			newErrors.username = "Username is required";
		}
		if (!credentials.password.trim()) {
			newErrors.password = "Password is required";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		// Mock login - accept any non-empty credentials
		dispatch(loginStart());

		setTimeout(() => {
			dispatch(
				loginSuccess({
					id: "1",
					username: credentials.username,
					email: `${credentials.username}@example.com`,
				})
			);
			router.replace("/(tabs)/dashboard");
		}, 1000);
	};

	return (
		<View className="flex-1">
			<LinearGradient
				colors={["#0f172a", "#1e293b", "#000000"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{
					flex: 1,
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
				}}
			>
				{/* Animated background elements */}
				<View className="absolute inset-0">
					<View className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-float" />
					<View className="absolute top-40 right-16 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
					<View
						className="absolute bottom-32 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-float"
						style={{ animationDelay: "2s" }}
					/>
				</View>

				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					className="flex-1 justify-center px-8"
				>
					{/* Premium Brand Section */}
					<View className="mb-16 transition-all duration-300">
						<View className="items-center">
							{/* Logo container with premium styling */}
							<View className="relative mb-8">
								<View className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-lg" />
								<View className="relative bg-black/20 border border-white/10 rounded-full p-6">
									<Text className="text-6xl text-center animate-bounce">
										💪
									</Text>
								</View>
							</View>

							{/* App Title with gradient text */}
							<Text className="text-cyan-400 text-5xl font-black text-center mb-3 tracking-wider">
								QOWWA
							</Text>
							<Text className="text-white/90 text-xl text-center mb-6 font-light tracking-wide">
								Fitness Evolution
							</Text>

							{/* Premium accent line */}
							<View className="relative mx-auto mb-8">
								<View className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
								<View className="absolute inset-0 h-1 w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full animate-pulse-glow" />
							</View>
						</View>
					</View>

					{/* Login Form with premium styling */}
					<View
						className="space-y-6 transition-all duration-300"
						style={{ animationDelay: "0.2s" }}
					>
						<LinearGradient
							colors={[
								"rgba(17, 24, 39, 0.8)",
								"rgba(31, 41, 55, 0.6)",
								"rgba(0, 0, 0, 0.8)",
							]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							className="rounded-3xl p-8 shadow-2xl border border-cyan-500/20"
						>
							<CustomInput
								label="Username"
								placeholder="Enter your username"
								value={credentials.username}
								onChangeText={(text) =>
									setCredentials({ ...credentials, username: text })
								}
								error={errors.username}
								variant="premium"
								autoCapitalize="none"
								leftIcon={<Text className="text-cyan-400 text-lg">👤</Text>}
							/>

							<CustomInput
								label="Password"
								placeholder="Enter your password"
								value={credentials.password}
								onChangeText={(text) =>
									setCredentials({ ...credentials, password: text })
								}
								error={errors.password}
								variant="premium"
								secureTextEntry
								leftIcon={<Text className="text-cyan-400 text-lg">🔐</Text>}
							/>

							<View className="mt-8">
								<CustomButton
									title="SIGN IN"
									onPress={handleLogin}
									variant="premium"
									gradientColors={["#06b6d4", "#3b82f6"]}
									textClassName="text-white font-black text-lg tracking-widest"
									size="large"
									glowing
									iconRight={<Text className="text-white text-lg">→</Text>}
								/>
							</View>

							{/* Additional options */}
							<View className="mt-6 pt-6 border-t border-white/10">
								<TouchableOpacity className="py-2">
									<Text className="text-cyan-300 text-center text-sm font-semibold">
										Forgot Password?
									</Text>
								</TouchableOpacity>
							</View>
						</LinearGradient>
					</View>

					{/* Premium Footer */}
					<View
						className="mt-16 transition-all duration-300"
						style={{ animationDelay: "0.4s" }}
					>
						<Text className="text-white/60 text-center text-sm font-medium leading-relaxed">
							🚀 Welcome to the future of fitness
						</Text>
						<Text className="text-white/40 text-center text-xs mt-2">
							Transform your body, elevate your mind
						</Text>
					</View>
				</KeyboardAvoidingView>
			</LinearGradient>
		</View>
	);
}
