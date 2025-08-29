import React from "react";
import { Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

import {
	CALENDAR_ANIMATION_CONFIG,
	GESTURE_CONFIG,
	SPRING_CONFIG,
} from "@/utils/animationConfig";

const { width: screenWidth } = Dimensions.get("window");
const SWIPE_THRESHOLD = screenWidth * GESTURE_CONFIG.swipeThreshold;
const CARD_CONTAINER_WIDTH = screenWidth - 32;

interface CalendarGestureHandlerProps {
	children: React.ReactNode;
	onSwipeLeft: () => void;
	onSwipeRight: () => void;
	disabled?: boolean;
}

export default function CalendarGestureHandler({
	children,
	onSwipeLeft,
	onSwipeRight,
	disabled = false,
}: CalendarGestureHandlerProps) {
	const translateX = useSharedValue(0);
	const gestureActive = useSharedValue(false);

	const panGesture = Gesture.Pan()
		.enabled(!disabled)
		.onBegin(() => {
			gestureActive.value = true;
		})
		.onUpdate((event) => {
			// Only allow horizontal movement with resistance at boundaries
			const maxTranslate =
				CARD_CONTAINER_WIDTH * GESTURE_CONFIG.maxDragDistance;
			const resistance = GESTURE_CONFIG.boundaryResistance;

			if (Math.abs(event.translationX) > maxTranslate) {
				translateX.value =
					event.translationX > 0
						? maxTranslate + (event.translationX - maxTranslate) * resistance
						: -maxTranslate + (event.translationX + maxTranslate) * resistance;
			} else {
				translateX.value = event.translationX;
			}
		})
		.onEnd((event) => {
			const { translationX, velocityX } = event;
			const shouldSwipe =
				Math.abs(translationX) > SWIPE_THRESHOLD ||
				Math.abs(velocityX) > GESTURE_CONFIG.velocityThreshold;

			if (shouldSwipe) {
				if (translationX > 0) {
					// Swipe right - go to previous
					translateX.value = withTiming(
						CARD_CONTAINER_WIDTH,
						{ duration: CALENDAR_ANIMATION_CONFIG.duration },
						() => {
							translateX.value = 0;
							runOnJS(onSwipeRight)();
							gestureActive.value = false;
						}
					);
				} else {
					// Swipe left - go to next
					translateX.value = withTiming(
						-CARD_CONTAINER_WIDTH,
						{ duration: CALENDAR_ANIMATION_CONFIG.duration },
						() => {
							translateX.value = 0;
							runOnJS(onSwipeLeft)();
							gestureActive.value = false;
						}
					);
				}
			} else {
				// Spring back to center
				translateX.value = withSpring(0, SPRING_CONFIG.smooth);
				gestureActive.value = false;
			}
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View style={animatedStyle}>{children}</Animated.View>
		</GestureDetector>
	);
}
