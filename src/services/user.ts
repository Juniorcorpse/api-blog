import { prisma7Schema } from "@prisma/orm-postgres/config";
import { db } from "../prisma/db";
import bcrypt from "bcryptjs";

type CreateUserProps = {
    name:     string;
    email:    string;
    password: string;
}
export const createUser = async ({name, email, password} :CreateUserProps)=>{
    email = email.toLowerCase();
    // procura o usuaro pelo email
    const user = await db.orm.public.User.where({email}).first();
    //se achou quer dizer que o user já existe
    if(user) return false;

    const newPesswd = bcrypt.hashSync(password);
    return await db.orm.public.User.create({name, email, password:newPesswd});
}

type VerifyUserProps = {
    email: string;
    password: string;
}

export const verifyUser = async ({email, password}: VerifyUserProps) => {
    const user = await db.orm.public.User.where({email}).first();
    //se não achou
    if(!user) return false;

    /* se a senha informada (password) não bater com a 
    (user.password) existente no banco retorna false */
    if(!bcrypt.compareSync(password, user.password)) return false;
    
    //deu certo?
    return user;
}
