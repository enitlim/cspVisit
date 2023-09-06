import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userDetailReducer from "../features/userDetail/userDetailSlice";
export const store=configureStore({
    reducer:{
        auth:authReducer,
        user:userDetailReducer,
    }
});