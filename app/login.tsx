import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Colors } from "@/constants/Colors";
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
				colors={Colors.theme.gradientDarkPrimary}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{
					flex: 1,
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
				}}
			>
				{/* Enhanced animated background elements with gold theme */}
				<View className="absolute inset-0">
					<View className="absolute top-20 left-10 w-32 h-32 bg-gold-500/8 rounded-full blur-xl animate-float" />
					<View className="absolute top-40 right-16 w-24 h-24 bg-gold-400/6 rounded-full blur-xl animate-pulse" />
					<View
						className="absolute bottom-32 left-20 w-40 h-40 bg-gold-300/4 rounded-full blur-xl animate-float"
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
							{/* Logo container with stunning gold styling */}
							<View className="relative mb-8">
								<View className="absolute -inset-4 bg-gold-500/20 rounded-full blur-lg" />
								<View className="relative bg-black/30 border border-gold-500/30 rounded-full p-6">
									<Text className="text-6xl text-center animate-bounce">
										💪
									</Text>
								</View>
							</View>

							{/* App Title with stunning gold theme */}
							<Text className="text-gold-400 text-5xl font-black text-center mb-3 tracking-wider">
								Sphinx Strength
							</Text>
							<Text className="text-grey-200 text-xl text-center mb-6 font-light tracking-wide">
								Fitness <Text className="text-gold-300">Evolution</Text>
							</Text>

							{/* Premium gold accent line */}
							<LinearGradient
								colors={["transparent", Colors.theme.primary, "transparent"]}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
								style={{
									height: 2,
									width: 128,
									alignSelf: "center",
									marginBottom: 32,
									borderRadius: 4,
								}}
							/>
						</View>
					</View>

					{/* Login Form with premium styling */}
					<View
						className="space-y-6 transition-all duration-300"
						style={{ animationDelay: "0.2s" }}
					>
						<LinearGradient
							colors={Colors.theme.gradientDarkSecondary}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={{
								borderRadius: 24,
								padding: 32,
								borderWidth: 1,
								borderColor: Colors.theme.borderAccent + "30",
								shadowColor: Colors.theme.shadowGold,
								shadowOffset: { width: 0, height: 8 },
								shadowOpacity: 0.3,
								shadowRadius: 16,
								elevation: 12,
							}}
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
								leftIcon={<Text className="text-gold-400 text-lg">👤</Text>}
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
								leftIcon={<Text className="text-gold-400 text-lg">🔐</Text>}
							/>

							<View className="mt-8">
								<CustomButton
									title="SIGN IN"
									onPress={handleLogin}
									variant="premium"
									textClassName="text-white font-black text-lg tracking-widest"
									size="large"
									glowing
									iconRight={<Text className="text-white text-lg">→</Text>}
								/>
							</View>

							{/* Additional options */}
							<View className="mt-6 pt-6 border-t border-white/10">
								<TouchableOpacity className="py-2">
									<Text className="text-gold-300 text-center text-sm font-semibold">
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
