import { AuthState, User } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	isLoading: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginStart: (state) => {
			state.isLoading = true;
		},
		loginSuccess: (state, action: PayloadAction<User>) => {
			state.isAuthenticated = true;
			state.user = action.payload;
			state.isLoading = false;
		},
		loginFailure: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.isLoading = false;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.isLoading = false;
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, logout } =
	userSlice.actions;
export default userSlice.reducer;
