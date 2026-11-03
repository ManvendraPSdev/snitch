import { setError , setLoading , setToken , setUser } from "../state/auth.slice";
import { login , register } from "../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = ()=>{

    const dispatch = useDispatch()

    async function handelRegister({email , password , fullName , contact , isSeller = false}){
        dispatch(setLoading(true))
        dispatch(setError(null))

        try {
            const data = await register({email , password , fullName , contact , isSeller})
            dispatch(setUser(data.user))
            dispatch(setToken(data.token))
            localStorage.setItem("user" , JSON.stringify(data.user))
            localStorage.setItem("token" , data.token)
            return data
        } catch (error) {
            dispatch(setError(error.message))
            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handelLogin({email , password}){
        dispatch(setLoading(true))
        dispatch(setError(null))

        try {
            const data = await login({email , password})
            dispatch(setUser(data.user))
            dispatch(setToken(data.token))
            localStorage.setItem("user" , JSON.stringify(data.user))
            localStorage.setItem("token" , data.token)
            return data
        } catch (error) {
            dispatch(setError(error.message))
            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {handelRegister , handelLogin}
}