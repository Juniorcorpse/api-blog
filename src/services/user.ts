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

    const user = await db.orm.public.User.where({email}).first();
    if(user) return false;

    const newPesswd = bcrypt.hashSync(password);
    return await db.orm.public.User.create({name, email, password:newPesswd});
}