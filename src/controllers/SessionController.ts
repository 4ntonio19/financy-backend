import { Request, Response } from "express";
import SessionService from "../services/SessionService";

export default class SessionController {
  async createSession(req: Request, res: Response) {
    const sessionService = new SessionService();
    try {
      const { email, password } = req.body;
      const userSession = await sessionService.createSession(email, password);
      res.status(201).json(userSession);
    } catch (error: any) {
      res.status(401).json({ message: "Usuário ou senha incorreto." });
    }
  }
}
