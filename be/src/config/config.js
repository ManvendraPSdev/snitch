import dotenv from "dotenv" ; 

dotenv.config() ; 

if(!process.env.MONGO_URI){
    throw new Error("Mongo_URI is not present in .env file")
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not present in .env file")
}

export const config = {
    MONGO_URI : process.env.MONGO_URI ,
    JWT_SECRET : process.env.JWT_SECRET
}
