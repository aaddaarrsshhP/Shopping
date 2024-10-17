import { createSlice } from "@reduxjs/toolkit";

const initialState={
    address: []
}


const addressSlice=createSlice({
    name: 'address',
    initialState,
    reducers: {
        onAddressEntry:(state,action)=>{
            state.address=action.payload.address
                   
        },

        onAddressRemove:(state)=>{
            state.address= []
        }

    }
    
})

export const selectAddress=(state)=>state.address.address


export const {onAddressEntry,onAddressRemove}=addressSlice.actions

export default addressSlice.reducer