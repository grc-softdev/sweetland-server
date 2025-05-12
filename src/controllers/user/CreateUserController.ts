import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      console.warn(req.body)
      const createUserService = new CreateUserService();
      const user = await createUserService.execute({ name, email, password });
      console.warn("creating user")
      return res.status(201).json(user);
    } catch (error: any) {

      console.error(error.message);
     
      if (error.message === "Email incorrect" || error.message === "User already exists") {
        return res.status(400).json({ error: error.message });
      }

      // For unexpected errors

      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export { CreateUserController };
