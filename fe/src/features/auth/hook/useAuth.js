import { setError , setLoading , setUser } from "../state/auth.slice";
import { register } from "../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = ()=>{

    const dispatch = useDispatch()

    async function handelRegister({email , password , fullName , contact , isSeller = false}){
        const data = await register({email , password , fullName , contact , isSeller})
        dispatch(setUser(data.user))
    }

    async function handelLogin({email , password}){
        const data = await login({email , password})
        dispatch(setUser(data.user))
    }

    return {handelRegister , handelLogin}
}