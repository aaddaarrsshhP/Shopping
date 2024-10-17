import { createSlice } from "@reduxjs/toolkit";

const initialState={
    phoneNumber: null
}


const phoneSlice=createSlice({
    name: 'phone',
    initialState,
    reducers:{
        onPhonechange:(state,action)=>{
               
            state.phoneNumber=action.payload.phone

        }

        ,onPhoneRemove:(state)=>{
            state.phoneNumber= null
        }
    }
})

export const {onPhonechange,onPhoneRemove}=phoneSlice.actions;
export const selectPhone=(state)=>state.phone.phoneNumber
export default phoneSlice.reducer;