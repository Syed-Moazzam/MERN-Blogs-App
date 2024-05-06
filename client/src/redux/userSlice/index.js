import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        isAuthenticated: false,
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        updateAuthenticatedUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        deleteAuthenticatedUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});

export const { login, logout, updateAuthenticatedUser, deleteAuthenticatedUser } = userSlice.actions;
export default userSlice.reducer;

