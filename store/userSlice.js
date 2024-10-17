import { createSlice } from "@reduxjs/toolkit";

const initialState={
    username: 'Guest',
    userid: null,
    email: null
}


const userSlice=createSlice({
    name: 'user',
    initialState,
    reducers: {
        onLogIn:(state,action)=>{
            state.username=action.payload.username
            state.userid= action.payload.userid
            state.email=action.payload.email
        },

        onLogOut:(state,action)=>{
            state.username="guest"    
            state.userid= null
            state.email=null
        }
    }
    
})

export const selectUserid=(state)=>state.user.userid
export const selectEmail=(state)=>state.user.email

export const {onLogIn,onLogOut}=userSlice.actions

export default userSlice.reducer