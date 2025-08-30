// Global types for the app

export interface User {
	id: string;
	username: string;
	email?: string;
}

export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	isLoading: boolean;
}

export interface WorkoutProgress {
	exercise: string;
	weight: number;
	reps: number;
	date: string;
}

export interface DashboardCardProps {
	title: string;
	subtitle: string;
	icon: string;
	onPress: () => void;
	gradient?: readonly [string, string, ...string[]];
	variant?: "default" | "glass" | "premium" | "gold" | "dark";
}

export interface LoginCredentials {
	username: string;
	password: string;
}
