import axios from "axios";

const authApiInstance = axios.create({
    baseURL : "http://localhost:8000/api/v1/router" ,
    withCredentials : true
})

authApiInstance.interceptors.response.use(
    (response) => response ,
    (error) => {
        const apiErrors = error.response?.data?.errors
        const message = Array.isArray(apiErrors) && apiErrors.length
            ? apiErrors.map((apiError) => apiError.msg).join(" ")
            : error.response?.data?.message || "Unable to connect to the server. Please try again."

        return Promise.reject(new Error(message))
    }
)

export const register = async({email , password , fullName , contact , isSeller})=>{
    const response = await authApiInstance.post("/register" , {
        email , 
        password , 
        fullName ,
        contact , 
        isSeller
    })

    return response.data
}

export const login  = async({email, password})=>{
    const response = await authApiInstance.post("/login" , {
        email , 
        password
    })

    return response.data
}