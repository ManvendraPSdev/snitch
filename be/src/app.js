import express from "express" ; 
import cookieParser from "cookie-parser";

import router from "./routes/auth.route.js" ; 
import cors from "cors" ; 


const app = express() ; 

app.use(express.json()) ; 
app.use(cookieParser()) ;
app.use(cors({
    origin : "http://localhost:5173" , 
    methods : ["GET" , "PUT" , "POST" , "DELETE"]
    credentials : true
}))

app.use("/api/v1/router" , router) ; 

export default app ; 