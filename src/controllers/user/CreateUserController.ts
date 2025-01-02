import { Request, Response, response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController{
    async handle(req: Request, res: Response) {
        //posso repassar as informações desconstruido o obj
        const { name, email, password } = (req.body)
        //inicializa o serviço
        const createUserService = new CreateUserService();
        //executa o serviço - mas pra executar ele precisa esperar pra enviar os dados
        const user = await createUserService.execute({
            name, email, password
        })
        //envia o serviço
        return res.json(user)
    }
}

export { CreateUserController } 