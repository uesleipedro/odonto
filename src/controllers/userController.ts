import { User, LoginData } from '../utils/types'
import { UserData } from '../data/userData'
import { EmpresaController } from './empresaController'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { EmailController } from './emailController'
import crypto from 'crypto'

const bcrypt = require('bcryptjs')
const userData = new UserData()
const empresaController = new EmpresaController()
const emailController = new EmailController()

export const SECRET_KEY: Secret = 'your-secret-key-here';

interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export class UserController {
  getUsers() {

    return userData.getUsers();
  }

  async getUserByEmpresa(id_empresa: number){
    
    return userData.getUserByEmpresa(id_empresa)
  }

  async getUserByEmpresa2(id_empresa: number){
    
    return userData.getUserByEmpresa2(id_empresa)
  }
 
  async getUserByEmail(email: string) {
    const user = await userData.getUserByEmail(email)
    if (!user) throw new Error('User not found')
    return user
  };

  async login(loginData: LoginData) {
    const foundUser = await userData.getUserByEmail(loginData.email);
    //if (!foundUser) throw new Error('Wrong username or password!');

    const isMatch = bcrypt.compareSync(loginData.senha, foundUser.senha);
    //if (!isMatch) throw new Error('Wrong username or password!');

    const token = jwt.sign({ _id: foundUser.id_user?.toString(), nome: foundUser.nome }, SECRET_KEY, {
      expiresIn: '2 days',
    });

    return !foundUser || !isMatch
      ? {error: "Usuário ou senha incorretos!"}
      : { user: { foundUser }, token: token, expiratedAt: '' };
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

  async updatePassword(req: Request, res: Response){
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
    
    const token = await crypto.randomBytes(5).toString('hex')
    console.log('token', token)
    try {
      const addedToken = await userData.addTokenResetPassword(req.body.email, token)
      if(addedToken){
        await emailController.sendEmail({
          	to: req.body.email,
	          subject: "Recuperação de senha",
            token
        })
          res.status(200).send({message: "Token incluído com sucesso"})
      }else{
        res.status(401).send({message: "Erro ao tentar resetar a senha!"})
      }
    } catch (error) {
      return res.status(500).send(error);
    } 
  }

  async checkToken(req: Request, res: Response) {
    const foundUser = await userData.getUserByEmail(req.body.email)

    foundUser?.token_to_reset_password === req.body.token
      ? res.status(200).send({message: "Tokens match"})
      : res.status(401).send({messagem: "Tokens do not match"})
  }

  async deleteUser(id_user: number, id_empresa: number) {

    return await userData.deleteUser(id_user, id_empresa);
  }

  async encryptPassword(password: string){
    const saltRound = 8
    return await bcrypt.hash(password, saltRound)
  }

  async saveUser(user: any) {
    const existingUser = await userData.getUserByEmail(user.email)
    if (existingUser) throw new Error(JSON.stringify({ status: 400, error: 'Email already exists' }))
    
    user.senha = await this.encryptPassword(user.senha) 
    const cadastroEmpresa = user.id_empresa 
      ? {id_empresa: user.id_empresa}
      : await empresaController.saveEmpresa({razao_social: user.razao_social, cnpj_cpf: user.cnpj_cpf})
    
    if(cadastroEmpresa) 
      user.id_empresa = cadastroEmpresa.id_empresa
    else
      throw Error('Erro ao cadastrar empresa')

      
    return userData.saveUser(user)
  };


} 
