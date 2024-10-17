import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentAddress:null
}


const userCurrentAddressSlice=createSlice({
    name: 'currentAddress',
    initialState,
    reducers:{
        puttingCurrentAddress:(state,action)=>{
            state.currentAddress=action.payload.currentAddress
        }
        ,currentAddressRemove:(state,action)=>{
            state.currentAddress=null
        }
    }
})

export const {puttingCurrentAddress,currentAddressRemove} = userCurrentAddressSlice.actions
export const SelectCurrentAddress =(state)=>state.currentAddress.currentAddress

export default userCurrentAddressSlice.reducer