import { Request } from "express";
import { Models } from "../prisma/contract";

type UserWithoutPassword = Pick<Models.public_User, "id" | "name" | "email">;

export type ExtendedRequest = Request & {
    user?: UserWithoutPassword;
};