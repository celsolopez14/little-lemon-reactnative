import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : {
        name:'',
        email:'',
        isSignedIn:false,
        isLoading:true
    }
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        saveName:(state, action) =>{
            state.user = {
                ...state.user,
                name:action.payload
            } 
            
        },
        saveEmail:(state, action) =>{
            state.user = {
                ...state.user,
                email:action.payload
            }
            
        },
        saveUser:(state, action) =>{
            state.user = {
                ...state.user,
                name: action.payload.name,
                email: action.payload.email
            }
            
        },
        
        signIn:(state, action) =>{
            state.user ={
                ...state.user,
                isSignedIn:action.payload
            }
        },

        isLoading:(state, action) =>{
            state.user ={
                ...state.user,
                isLoading:action.payload
            }
        }
    },

})

export const {isLoading, saveUser, signIn} = userSlice.actions

export default userSlice.reducer