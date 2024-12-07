import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
            localStorage.setItem("token", action.payload.token);
            state.user = action.payload;
        },
        logout: state => {
            localStorage.removeItem("token");
            state.user = null;
        },
        setEmailVerified: state => {
            state.user.isEmailVerified = true;
        },
        updateUser: (state, action) => {
            (state.user.firstName = action.payload.firstName),
                (state.user.lastName = action.payload.lastName),
                (state.user.pfp = action.payload.pfp);
        },
    },
});

export const { login, logout, setEmailVerified, updateUser } =
    userSlice.actions;

export default userSlice.reducer;
