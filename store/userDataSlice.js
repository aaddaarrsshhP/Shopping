import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cart:[],
    favourite: [],
    
}


const dataSlice=createSlice({
    name: 'data',
    initialState,
    reducers: {
        onDataEntry:(state,action)=>{
            state.cart=action.payload.cart
            state.favourite=action.payload.favourite
            
        },

        onDataLogOut:(state,action)=>{
                
            state.cart= null
            state.favourite=null
            
        }
    }
    
})


export const selectCart=(state)=>state.data.cart
export const selectFavourite=(state)=>state.data.favourite

export const {onDataEntry,onDataLogOut}=dataSlice.actions
export default dataSlice.reducer;