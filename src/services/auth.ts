import { Models } from "../prisma/contract"
import { createJWT, readJWT } from "../libs/jwt";
import { Request } from "express";
import { isTokenPayload, TokenPayload } from "../types/token-payload";
import { getUserById } from "./user";

type TokenUser = Pick<Models.public_User, "id">;
export const createToken = ({ id }: TokenUser) => createJWT({id});

export const verifyRequest = async (req: Request) =>{
    //no header da requisição pego o authorization
    const {authorization} = req.headers;

    //se authorization existir
    if(authorization){
        //pego o tokem no index 1 do array
        const authSplit = authorization.split('Bearer ')
        //se existir o tokem em authSplit
        if(authSplit[1]){
            //LER o token usando a função readJWT()
            const payload = readJWT(authSplit[1]);
            //consegui ler garantindo que seja do tipo TokenPayload
            if (isTokenPayload(payload)) {
                const user = await getUserById(payload.id);
                if (user) return user;
            }
        }
    }
    //error: não verificou a requisição -> return false
    return false;
};