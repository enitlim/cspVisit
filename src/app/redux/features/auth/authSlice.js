import { createSlice } from "@reduxjs/toolkit"

const initialState={
    userID:null,
    email:null,
    accessToken:null,
    isLoading:"loading"
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state, action)=>{
            const {userID, email, accessToken,isLoading}=action.payload;
            state.userID = userID;
            state.email = email;
            state.accessToken = accessToken;
            state.isLoading = isLoading;
        },
        clearUser:(state, action)=>{
             const { isLoading } = action.payload;
             state.userID = null;
             state.email = null;
             state.accessToken = null;
             state.isLoading = isLoading;
        }
    }
})

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;