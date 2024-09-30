import 'dotenv/config'
import { LoginData } from '../utils/types'
import { UserData } from '../data/userData'
import { EmpresaController } from './empresaController'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { EmailController } from './emailController'
import { AccessLevelScreenController } from './accessLevelScreenController'
import crypto from 'crypto'
import AppError from '../utils/appError'

const bcrypt = require('bcryptjs')
const userData = new UserData()
const empresaController = new EmpresaController()
const emailController = new EmailController()
const accessLevelScreenController = new AccessLevelScreenController()

export const SECRET_KEY: any = process.env.SECRET_KEY

interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export class UserController {
  getUsers() {

    return userData.getUsers();
  }

  async getUserByEmpresa(id_empresa: number) {

    return userData.getUserByEmpresa(id_empresa)
  }

  async getUserByEmpresa2(id_empresa: number) {

    return userData.getUserByEmpresa2(id_empresa)
  }

  async getUserByEmail(email: string) {
    const user = await userData.getUserByEmail(email)
    if (!user) throw new Error('User not found')
    return user
  };

  async login(loginData: LoginData) {
    const foundUser = await userData.getUserByEmail(loginData.email)

    const isMatch = bcrypt.compareSync(loginData.senha, foundUser.senha)
    return foundUser

    const access_level =
      await accessLevelScreenController.getAccessLevelScreen(
        {
          id_empresa: foundUser.id_empresa,
          id_access_levels: foundUser.access_levels
        })

    const token = jwt.sign({ id_user: foundUser.id_user, email: foundUser.email }, SECRET_KEY, {
      expiresIn: '24h'
    })

    return !foundUser || !isMatch
      ? { error: "Usuário ou senha incorretos!" }
      : { user: { foundUser }, token: token, expiratedAt: '', access_level }
  }

  async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        throw new Error();
      }

      const decoded = jwt.verify(token, SECRET_KEY);
      (req as CustomRequest).token = decoded;

      next();
    } catch (err) {
      res.status(401).send('Please authenticate');
    }
  };

  async loginOne(req: Request, res: Response) {
    try {
      const foundUser = await this.login(req.body);
      res.status(200).send(foundUser);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async updateUser(user: any) {
    try {
      user.senha = await this.encryptPassword(user.senha)
      return userData.updateUser(user)
    } catch (error) {
      return error
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      return await userData.updatePassword(
        req.body.email,
        await this.encryptPassword(req.body.senha)
      )
    } catch (error) {
      return error
    }
  }

  async recuperarSenha(req: Request, res: Response) {
    const foundUser = await userData.getUserByEmail(req.body.email)

    !foundUser && res.status(404).send("Usuário não encontrado!")

    const token = crypto.randomBytes(5).toString('hex')
    try {
      const addedToken = await userData.addTokenResetPassword(req.body.email, token)
      if (addedToken) {
        await emailController.sendEmail({
          to: req.body.email,
          subject: "Recuperação de senha",
          token
        })
        res.status(200).send({ message: "Token incluído com sucesso" })
      } else {
        res.status(401).send({ message: "Erro ao tentar resetar a senha!" })
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async checkToken(req: Request, res: Response) {
    const foundUser = await userData.getUserByEmail(req.body.email)

    foundUser?.token_to_reset_password === req.body.token
      ? res.status(200).send({ message: "Tokens match" })
      : res.status(401).send({ messagem: "Tokens do not match" })
  }

  async deleteUser(id_user: number, id_empresa: number) {

    return await userData.deleteUser(id_user, id_empresa);
  }

  async encryptPassword(password: string) {
    const saltRound = 8
    return await bcrypt.hash(password, saltRound)
  }

  async saveUser(user: any, next: NextFunction) {
    const existingUser = await userData.getUserByEmail(user.email)
    if (existingUser) {
      next(new AppError('Já existe um cadastro com este email!', 409))
    }

    console.log("passou pelo existing user")
    user.senha = await this.encryptPassword(user.senha)

    console.log("senha", user.senha)
    console.log("user.id_empresa", user.id_empresa)

    /*const cadastroEmpresa = user.id_empresa
      ? { id_empresa: user.id_empresa }
      : await empresaController.saveEmpresa(user, next)*/
    const cadastroEmpresa = await empresaController.saveEmpresa(user, next)

    console.log("cadastroEmpresa", cadastroEmpresa)
    if (!cadastroEmpresa)
      next(cadastroEmpresa)

    user.id_empresa = cadastroEmpresa.id_empresa

    try {
      return userData.saveUser(user)

    } catch (e: any) {
      return e
    }
  }


} 
