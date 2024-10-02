import { configureStore } from "@reduxjs/toolkit";
import { authReducer, authSlice } from "./slices/authReducer";
import { mainReducer } from "./slices/mainReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        main: mainReducer,
    },
})

export const authActions = authSlice.actions;