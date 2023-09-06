import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userData:null
}

const userDetailSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        updateUserDetails:(state, action)=>{
            state.userData=action.payload;
        },
        clearUserDetails:(state)=>{
        state.userData=null;
        }
    }
});

export const{updateUserDetails, clearUserDetails}=userDetailSlice.actions;
export default userDetailSlice.reducer;