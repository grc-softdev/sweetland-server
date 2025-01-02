import prismaClient from "../../prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

type AuthRequest = {
  email: string;
  password: string;
};

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    //console.log(email)
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error(" Incorrect user/password");
    }

    // verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("incorrect user/password");
    }

    // gerar um token jwt e devolver os dados para o usuário. / logar
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        //enviando o id do usuario pro isAuthenticated
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export { AuthUserService };
