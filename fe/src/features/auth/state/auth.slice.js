import { createSlice } from "@reduxjs/toolkit";

const getStoredUser = ()=>{
    try {
        return JSON.parse(localStorage.getItem("user"))
    } catch {
        localStorage.removeItem("user")
        return null
    }
}

const authSlice = createSlice({
    name : "auth" , 
    initialState : {
        user : getStoredUser() ,
        token : localStorage.getItem("token") ,
        loading : false , 
        error : null
    } , 
    reducers : {
        setUser : (state , action)=>{
            state.user = action.payload
        } , 
        setToken : (state , action)=>{
            state.token = action.payload
        } ,
        setLoading : (state , action)=>{
            state.loading = action.payload
        } , 
        setError : (state , action)=>{
            state.error = action.payload
        }
    }
})

export const {setUser , setToken , setLoading , setError} = authSlice.actions ;
export default authSlice.reducer