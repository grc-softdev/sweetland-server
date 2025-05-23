import prismaClient from "../../prisma"
import { hash } from "bcrypt"

type UserRequest = {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest){

        if(!email) {
            throw new Error("Email incorrect")
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        const passwordHash = await hash(password, 8)
        console.log('about to create a user')

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        console.log('created user', user)

        return user;
    }
}

export { CreateUserService }