import { NextFunction, Request, Response } from "express";
import { verifyRequest } from "../services/auth";
import { ExtendedRequest } from "../types/estended-request";

export const privateRoute = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    /*verifyRequest(req) de services/auth.ts
    verifica a requisição e retorna o usuario logado*/
    const user = await verifyRequest(req);

    if (!user) {
        res.status(403).json('Acesso negado!');
        return;
    }
    /*add o user logado na requisição
    dando acesso para outas rota ao user logado na requisição*/
    req.user = user;

    next();
}