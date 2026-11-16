import { RequestHandler } from "express";
import { error } from "node:console";
import z from "zod";
import { createUser } from "../services/user";
import { createToken } from "../services/auth";

export const signup: RequestHandler = async (req, res) =>{
    const schema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string(),
    });
    const data = schema.safeParse(req.body);
    if(!data.success){
        res.json({ error: z.flattenError(data.error).fieldErrors });
        return;
    }
    const newUser = await createUser(data.data);
    if(!newUser){
        res.json({error: 'Erro ao criar usuário'});
        return;
    }
    
    const token = createToken({id: newUser.id});
    res.status(201).json({
        user:{
            id: newUser.id,
            name:newUser.name,
            email:newUser.email
        },
        token
    });

}

export const signin: RequestHandler = async (req, res) =>{
    
}

export const validate: RequestHandler = async (req, res) =>{
    
}
