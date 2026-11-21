import { hash, Hash } from "crypto";
import jwt from "jsonwebtoken"

//cria o token jwt
export const createJWT = (payload: any)=>{
    return jwt.sign(
        payload,
        process.env.JWT_KEY as string//chave privada
    );
}

//ler o token jwt passado no paremtro hash
export const readJWT = (hash: string) =>{
    try{
        return jwt.verify(
            hash,
            process.env.JWT_KEY as string//chave privada
        );
    }catch(error){
        return false;
    }
    
}
