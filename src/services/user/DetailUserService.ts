import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string){
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            //incluído para selecionar oque retorna
    
            select: {
                id: true,
                name: true,
                email: true,
            }
        })
        return user;
    }
}

export { DetailUserService }