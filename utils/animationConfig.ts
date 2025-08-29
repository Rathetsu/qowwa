/**
 * Optimized animation configurations for calendar components
 */

// Fast, smooth timing configuration for calendar transitions
export const CALENDAR_ANIMATION_CONFIG = {
	// Standard transition duration (300ms for responsive feel)
	duration: 300,

	// Optimized easing curves
	easing: {
		// For quick, snappy interactions
		quick: "cubic-bezier(0.25, 0.1, 0.25, 1)",
		// For smooth, natural movements
		smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
		// For bouncy, playful animations
		bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
	},
} as const;

// Spring animation configurations
export const SPRING_CONFIG = {
	// Fast, responsive spring
	quick: {
		damping: 25,
		stiffness: 400,
		mass: 1,
		overshootClamping: false,
	},

	// Smooth, natural spring
	smooth: {
		damping: 20,
		stiffness: 300,
		mass: 1,
		overshootClamping: false,
	},

	// Gentle, controlled spring
	gentle: {
		damping: 30,
		stiffness: 200,
		mass: 1,
		overshootClamping: true,
	},
} as const;

// Gesture recognition thresholds
export const GESTURE_CONFIG = {
	// Minimum distance to trigger navigation (25% of screen width)
	swipeThreshold: 0.25,

	// Minimum velocity to trigger immediate navigation
	velocityThreshold: 500,

	// Maximum drag resistance at boundaries
	boundaryResistance: 0.3,

	// Maximum allowed drag distance (80% of container width)
	maxDragDistance: 0.8,
} as const;

// Performance optimization settings
export const PERFORMANCE_CONFIG = {
	// Cache size for day span computations
	cacheSize: 50,

	// Pre-computation distance (how many spans ahead/behind to compute)
	precomputeDistance: 1,

	// Animation frame rate target
	targetFPS: 60,

	// Whether to use native driver for animations
	useNativeDriver: true,
} as const;
