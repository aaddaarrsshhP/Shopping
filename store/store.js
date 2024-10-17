import { configureStore } from '@reduxjs/toolkit';

import userReducer from "./userSlice";
import dataReducer from './userDataSlice'
import addressReducer from './useaddress'
import currentAddressReducer from './userCurrentAddress'
import phoneReducer from './usePhone'
import orderReducer from './userOrder'

export const store= configureStore({
    reducer:{
        user: userReducer,
        data: dataReducer,
        address: addressReducer,
        currentAddress: currentAddressReducer,
        phone: phoneReducer,
        order: orderReducer
    }
    
})

export default store;

