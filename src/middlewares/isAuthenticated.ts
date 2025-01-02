import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type Payload = {
    sub: string;

}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){

    // receber o token, ele sempre vem dentro da req, do cabecalho, da authorization
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).end();
    }
// como o token vem junto com outros dados o split serve para pegar apenas o token

   const [, token] = authToken.split(" ")
   

   try {
    //validar o token
    const { sub } = verify(
        token, 
        process.env.JWT_SECRET
    ) as Payload
    // recuperar o id do token atraves do req
    req.user_id = sub
    
    //antes era aopenas o console no teste, após o teste no insomnia foi incluido o next para o codigo continuar rodando
    return next()
   } catch (error) {
    return res.status(401).end();
   }
}