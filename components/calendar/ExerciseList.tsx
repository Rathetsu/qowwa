import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { ExerciseListProps } from "@/types/calendar";

export default function ExerciseList({
	workout,
	isVisible,
}: ExerciseListProps) {
	if (!isVisible || !workout) {
		return null;
	}

	if (workout.isRestDay) {
		return (
			<View className="mx-4 mt-6">
				<LinearGradient
					colors={
						Colors.theme.gradientDarkSecondary as unknown as readonly [
							string,
							string,
							...string[],
						]
					}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={{
						borderRadius: 20,
						padding: 24,
						borderWidth: 1,
						borderColor: Colors.theme.borderAccent + "30",
					}}
				>
					<View className="items-center">
						<Text className="text-white text-xl font-bold mb-2">
							Optional Rest Day
						</Text>
						<Text className="text-grey-300 text-center text-base">
							Take time to recover and prepare for tomorrow&apos;s workout
						</Text>
						<View
							className="mt-4 rounded-xl px-4 py-2 border"
							style={{
								backgroundColor: Colors.theme.overlayGold,
								borderColor: Colors.theme.borderAccent + "40",
							}}
						>
							<Text className="text-gold-300 text-sm font-medium">
								💪 Active recovery recommended
							</Text>
						</View>
					</View>
				</LinearGradient>
			</View>
		);
	}

	return (
		<View className="mx-6 mt-8">
			{/* Enhanced Workout Header with gold theme */}
			<LinearGradient
				colors={
					Colors.theme.gradientGoldPrimary as unknown as readonly [
						string,
						string,
						...string[],
					]
				}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{
					borderRadius: 24,
					padding: 24,
					marginBottom: 24,
					shadowColor: Colors.theme.shadowGold,
					shadowOffset: { width: 0, height: 12 },
					shadowOpacity: 0.5,
					shadowRadius: 16,
				}}
			>
				<Text className="text-black text-2xl font-black mb-2">
					{workout.name}
				</Text>
				<Text className="text-black/80 text-base font-medium">
					{workout.exercises.length} exercises planned
				</Text>
			</LinearGradient>

			{/* Enhanced Exercise List Header */}
			<View className="mb-6">
				<Text className="text-white text-xl font-black mb-3">
					Today&apos;s <Text className="text-gold-400">Exercises</Text>
				</Text>
				<LinearGradient
					colors={
						Colors.theme.gradientGoldPrimary as unknown as readonly [
							string,
							string,
							...string[],
						]
					}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={{
						height: 3,
						width: 96,
						borderRadius: 6,
						shadowColor: Colors.theme.primary,
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.6,
						shadowRadius: 8,
					}}
				/>
			</View>

			{/* Enhanced Exercise Cards with gold theme */}
			<ScrollView showsVerticalScrollIndicator={false} className="max-h-96">
				{workout.exercises.map((exercise, index) => (
					<TouchableOpacity
						key={exercise.id}
						activeOpacity={0.8}
						className="mb-4"
						style={{
							shadowColor: Colors.theme.shadowDark,
							shadowOffset: { width: 0, height: 6 },
							shadowOpacity: 0.3,
							shadowRadius: 12,
						}}
					>
						<LinearGradient
							colors={
								Colors.theme.gradientDarkSecondary as unknown as readonly [
									string,
									string,
									...string[],
								]
							}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={{
								borderRadius: 20,
								padding: 20,
								borderWidth: 1,
								borderColor: Colors.theme.borderAccent + "20",
							}}
						>
							<View className="flex-row items-center justify-between">
								{/* Enhanced Exercise Number and Name */}
								<View className="flex-row items-center flex-1">
									<LinearGradient
										colors={
											Colors.theme.gradientGoldPrimary as unknown as readonly [
												string,
												string,
												...string[],
											]
										}
										style={{
											width: 40,
											height: 40,
											borderRadius: 20,
											alignItems: "center",
											justifyContent: "center",
											marginRight: 16,
											shadowColor: Colors.theme.shadowGold,
											shadowOffset: { width: 0, height: 4 },
											shadowOpacity: 0.5,
											shadowRadius: 8,
										}}
									>
										<Text className="text-black text-base font-black">
											{index + 1}
										</Text>
									</LinearGradient>
									<View className="flex-1">
										<Text className="text-white text-lg font-bold mb-1">
											{exercise.name}
										</Text>
										{exercise.targetMuscle && (
											<Text className="text-grey-300 text-sm font-medium">
												{exercise.targetMuscle}
											</Text>
										)}
									</View>
								</View>

								{/* Enhanced Sets and Reps */}
								<View
									className="rounded-xl px-4 py-3 border"
									style={{
										backgroundColor: Colors.theme.surfaceElevated + "60",
										borderColor: Colors.theme.borderAccent + "40",
									}}
								>
									<Text className="text-gold-400 text-base font-bold">
										{exercise.sets}
									</Text>
								</View>
							</View>

							{/* Enhanced Completion Status */}
							{exercise.isCompleted && (
								<View
									className="mt-4 pt-4 border-t"
									style={{ borderTopColor: Colors.theme.borderAccent + "20" }}
								>
									<View className="flex-row items-center">
										<View
											className="w-3 h-3 rounded-full mr-3 shadow-lg"
											style={{
												backgroundColor: Colors.theme.success,
												shadowColor: Colors.theme.success,
												shadowOffset: { width: 0, height: 2 },
												shadowOpacity: 0.6,
												shadowRadius: 4,
											}}
										/>
										<Text
											className="text-base font-bold"
											style={{ color: Colors.theme.success }}
										>
											Completed
										</Text>
									</View>
								</View>
							)}
						</LinearGradient>
					</TouchableOpacity>
				))}
			</ScrollView>

			{/* Enhanced Workout Summary Footer with gold theme */}
			<LinearGradient
				colors={
					Colors.theme.gradientDarkElevated as unknown as readonly [
						string,
						string,
						...string[],
					]
				}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{
					marginTop: 24,
					borderRadius: 20,
					padding: 24,
					borderWidth: 1,
					borderColor: Colors.theme.borderAccent + "30",
					shadowColor: Colors.theme.shadowGold,
					shadowOffset: { width: 0, height: 8 },
					shadowOpacity: 0.3,
					shadowRadius: 16,
				}}
			>
				<View className="flex-row justify-between items-center">
					<View className="items-center">
						<Text className="text-grey-400 text-sm font-medium mb-1">
							Total Exercises
						</Text>
						<Text className="text-white text-2xl font-black">
							{workout.exercises.length}
						</Text>
					</View>
					<View className="items-center">
						<Text className="text-grey-400 text-sm font-medium mb-1">
							Completed
						</Text>
						<Text className="text-gold-400 text-2xl font-black">
							{workout.exercises.filter((ex) => ex.isCompleted).length}
						</Text>
					</View>
					<View className="items-center">
						<Text className="text-grey-400 text-sm font-medium mb-1">
							Progress
						</Text>
						<Text className="text-gold-300 text-2xl font-black">
							{Math.round(
								(workout.exercises.filter((ex) => ex.isCompleted).length /
									workout.exercises.length) *
									100
							)}
							%
						</Text>
					</View>
				</View>

				{/* Progress bar */}
				<View className="mt-4">
					<View
						className="h-2 rounded-full overflow-hidden"
						style={{ backgroundColor: Colors.theme.surfacePrimary + "80" }}
					>
						<LinearGradient
							colors={
								Colors.theme.gradientGoldPrimary as unknown as readonly [
									string,
									string,
									...string[],
								]
							}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							style={{
								height: "100%",
								width: `${Math.round(
									(workout.exercises.filter((ex) => ex.isCompleted).length /
										workout.exercises.length) *
										100
								)}%`,
								borderRadius: 4,
							}}
						/>
					</View>
				</View>
			</LinearGradient>
		</View>
	);
}
