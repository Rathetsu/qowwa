import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

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
					colors={["rgba(107, 114, 128, 0.2)", "rgba(107, 114, 128, 0.1)"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					className="rounded-2xl p-6"
					style={{ borderRadius: 16 }}
				>
					<View className="items-center">
						<Text className="text-white text-xl font-bold mb-2">
							Optional Rest Day
						</Text>
						<Text className="text-gray-300 text-center text-base">
							Take time to recover and prepare for tomorrow's workout
						</Text>
						<View className="mt-4 bg-white/10 rounded-xl px-4 py-2">
							<Text className="text-gray-300 text-sm font-medium">
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
			{/* Workout Header */}
			<LinearGradient
				colors={[workout.color, `${workout.color}DD`]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				className="rounded-3xl p-6 mb-6"
				style={{
					borderRadius: 24,
					shadowColor: workout.color,
					shadowOffset: { width: 0, height: 8 },
					shadowOpacity: 0.3,
					shadowRadius: 12,
				}}
			>
				<Text className="text-white text-2xl font-black mb-2">
					{workout.name}
				</Text>
				<Text className="text-white/95 text-base font-medium">
					{workout.exercises.length} exercises planned
				</Text>
			</LinearGradient>

			{/* Exercise List Header */}
			<View className="mb-6">
				<Text className="text-white text-xl font-black mb-3">
					Today's Exercises
				</Text>
				<View className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
			</View>

			{/* Exercise Cards */}
			<ScrollView showsVerticalScrollIndicator={false} className="max-h-96">
				{workout.exercises.map((exercise, index) => (
					<TouchableOpacity
						key={exercise.id}
						activeOpacity={0.8}
						className="mb-4"
						style={{
							shadowColor: "#000000",
							shadowOffset: { width: 0, height: 4 },
							shadowOpacity: 0.15,
							shadowRadius: 8,
						}}
					>
						<View className="bg-white/10 border border-white/15 rounded-2xl p-5 backdrop-blur-sm">
							<View className="flex-row items-center justify-between">
								{/* Exercise Number and Name */}
								<View className="flex-row items-center flex-1">
									<LinearGradient
										colors={["#22d3ee", "#0891b2"]}
										className="w-10 h-10 rounded-full items-center justify-center mr-4"
										style={{
											borderRadius: 20,
											shadowColor: "#22d3ee",
											shadowOffset: { width: 0, height: 4 },
											shadowOpacity: 0.3,
											shadowRadius: 6,
										}}
									>
										<Text className="text-white text-base font-black">
											{index + 1}
										</Text>
									</LinearGradient>
									<View className="flex-1">
										<Text className="text-white text-lg font-bold mb-1">
											{exercise.name}
										</Text>
										{exercise.targetMuscle && (
											<Text className="text-gray-300 text-sm font-medium">
												{exercise.targetMuscle}
											</Text>
										)}
									</View>
								</View>

								{/* Sets and Reps */}
								<View className="bg-black/30 border border-white/10 rounded-xl px-4 py-3">
									<Text className="text-cyan-300 text-base font-bold">
										{exercise.sets}
									</Text>
								</View>
							</View>

							{/* Completion Status */}
							{exercise.isCompleted && (
								<View className="mt-4 pt-4 border-t border-white/15">
									<View className="flex-row items-center">
										<View className="w-3 h-3 bg-green-500 rounded-full mr-3 shadow-lg" />
										<Text className="text-green-400 text-base font-bold">
											Completed
										</Text>
									</View>
								</View>
							)}
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>

			{/* Workout Summary Footer */}
			<View className="mt-6 bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-sm">
				<View className="flex-row justify-between items-center">
					<View className="items-center">
						<Text className="text-gray-300 text-sm font-medium mb-1">
							Total Exercises
						</Text>
						<Text className="text-white text-2xl font-black">
							{workout.exercises.length}
						</Text>
					</View>
					<View className="items-center">
						<Text className="text-gray-300 text-sm font-medium mb-1">
							Completed
						</Text>
						<Text className="text-cyan-400 text-2xl font-black">
							{workout.exercises.filter((ex) => ex.isCompleted).length}
						</Text>
					</View>
					<View className="items-center">
						<Text className="text-gray-300 text-sm font-medium mb-1">
							Progress
						</Text>
						<Text className="text-purple-400 text-2xl font-black">
							{Math.round(
								(workout.exercises.filter((ex) => ex.isCompleted).length /
									workout.exercises.length) *
									100
							)}
							%
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
}
