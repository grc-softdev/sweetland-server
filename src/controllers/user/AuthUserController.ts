import { NextFunction, Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserServices";
class AuthUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const authUserService = new AuthUserService();

    try {
      const result = await authUserService.execute({ email, password });

      if ("error" in result) {
        return res.status(400).json({ error: result.error });
      }

      return res.json(result);
    } catch (err) {
      console.error("Authentication error:", err);
      return next(err);
    }
  }
}

export { AuthUserController };
