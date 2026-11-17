import { RequestHandler } from "express";
import { error } from "node:console";
import z from "zod";
import { createUser, verifyUser } from "../services/user";
import { createToken } from "../services/auth";

export const signup: RequestHandler = async (req, res) =>{
    //define o formato esperado dos dados com o zod (z)
    const schema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string(),
    });

    //compara o que veio na requisição com o formato assima
    const data = schema.safeParse(req.body);
    //falho rapido verificando o senario indesejado diferente de success
    if(!data.success){
        res.json({ error: z.flattenError(data.error).fieldErrors });
        return;//para o execução
    }
    //crio o usuario
    const newUser = await createUser(data.data);

    //se não criou lança mensagem de erro e para a execução
    if(!newUser){
        res.json({error: 'Erro ao criar usuário'});
        return;
    }
    
    //cria o teken
    const token = createToken({id: newUser.id});
    //resposta se sucesso!
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
    //define o formato esperado dos dados com o zod (z)
    const schema = z.object({        
        email: z.email(),
        password: z.string()
    }); 
    //compara o que veio na requisição com o formato assima
    const data = schema.safeParse(req.body);

    //falho rapido verificando o senario indesejado diferente de success
    if(!data.success){
        res.json({ error: z.flattenError(data.error).fieldErrors });
        return;//para o execução
    } 

    //buscar usuario
    const user = await verifyUser(data.data);
    if(!user){
        res.status(403).json({error: 'Acesso negado'});
        return;
    }

    //cria o teken
    const token = createToken({id: user.id});
    //resposta se sucesso!
    res.status(200).json({
        user:{
            id: user.id,
            name:user.name,
            email:user.email
        },
        token
    });
}

export const validate: RequestHandler = async (req, res) =>{
    
}
