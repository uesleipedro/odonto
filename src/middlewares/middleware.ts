import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
export const SECRET_KEY: any = process.env.SECRET_KEY

export class Middleware {

  async verificarToken(req: any, res: Response, next: NextFunction) {
    let token = req.headers['authorization']
    token = token?.split(" ")[1]
    if (!token) {
      return res.status(403).json({ message: 'Nenhum token fornecido' })
    }

    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Falha na autenticação do token' })
      }
      req.id_user = decoded.id_user
      req.email = decoded.email
      next()
    })
  }
}
