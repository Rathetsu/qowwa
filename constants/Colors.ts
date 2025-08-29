/**
 * Modern fitness app color scheme with proper contrast and hierarchy
 */

const tintColorLight = "#06b6d4"; // Cyan
const tintColorDark = "#22d3ee"; // Bright cyan

export const Colors = {
	light: {
		text: "#1f2937",
		background: "#f8fafc",
		tint: tintColorLight,
		icon: "#6b7280",
		tabIconDefault: "#9ca3af",
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: "#f1f5f9",
		background: "#0f172a",
		tint: tintColorDark,
		icon: "#94a3b8",
		tabIconDefault: "#64748b",
		tabIconSelected: tintColorDark,
	},
	// Fitness app specific colors
	fitness: {
		primary: "#22d3ee", // Bright cyan
		primaryDark: "#0891b2", // Darker cyan
		secondary: "#8b5cf6", // Purple
		accent: "#f59e0b", // Amber
		success: "#10b981", // Green
		warning: "#f59e0b", // Amber
		error: "#ef4444", // Red

		// Background gradients
		gradientStart: "#1e1b4b", // Deep purple
		gradientMid: "#312e81", // Purple
		gradientEnd: "#1e40af", // Blue

		// Text colors
		textPrimary: "#ffffff",
		textSecondary: "#e2e8f0",
		textMuted: "#94a3b8",
		textDisabled: "#64748b",

		// Surface colors
		surfacePrimary: "rgba(255, 255, 255, 0.1)",
		surfaceSecondary: "rgba(255, 255, 255, 0.05)",
		surfaceBorder: "rgba(255, 255, 255, 0.1)",
		surfaceBorderActive: "rgba(34, 211, 238, 0.5)",
	},
};
