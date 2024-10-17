import { createSlice } from "@reduxjs/toolkit";

const initialState={
     orders: []
}


const orderSlice=createSlice({
    name: 'order',
    initialState,
    reducers:{
        onOrderchange:(state,action)=>{
               
            state.orders=action.payload.order

        }
        ,onOrdersRemove:(state)=>{
            state.orders=[]
        }
    }
})

export const {onOrderchange,onOrdersRemove}=orderSlice.actions;
export const selectOrder=(state)=>state.order.orders
export default orderSlice.reducer;