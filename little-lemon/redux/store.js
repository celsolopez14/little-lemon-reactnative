import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice'
import AsyncStorage from "@react-native-async-storage/async-storage";




export const store = configureStore({
    reducer:{
        user: userReducer
    },
})