import { Mode } from "node:fs"
import { Models } from "../prisma/contract"
import { createJWT } from "../libs/jwt";

type TokenUser = Pick<Models.public_User, "id">;
export const createToken = ({ id }: TokenUser) => createJWT({id})