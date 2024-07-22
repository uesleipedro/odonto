import { User, LoginData } from '../utils/types'
import { UserData } from '../data/userData'
import { EmpresaController } from './empresaController'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const bcrypt = require('bcryptjs')
const userData = new UserData()
const empresaController = new EmpresaController()

//sera removido daqui
export const SECRET_KEY: Secret = 'your-secret-key-here';

interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export class UserController {
  getUsers() {

    return userData.getUsers();
  };

  async getUserByEmail(email: string) {
    const user = await userData.getUserByEmail(email);
    if (!user) throw new Error('User not found');
    return user;
  };

  async login(loginData: LoginData) {
    const foundUser = await userData.getUserByEmail(loginData.email);
    if (!foundUser) throw new Error('Wrong username or password!');

    const isMatch = bcrypt.compareSync(loginData.senha, foundUser.senha);
    if (!isMatch) throw new Error('Wrong username or password!');

    const token = jwt.sign({ _id: foundUser.id_user?.toString(), nome: foundUser.nome }, SECRET_KEY, {
      expiresIn: '2 days',
    });

    return { user: { foundUser }, token: token, expiratedAt: '' };
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
  };

  async saveUser(user: any) {
    const existingUser = await userData.getUserByEmail(user.email)
    if (existingUser) throw Error('User already exists')

    const saltRound = 8;
    user.senha = await bcrypt.hash(user.senha, saltRound)

    const cadastroEmpresa = await empresaController.saveEmpresa({razao_social: user.razao_social, cnpj_cpf: user.cnpj_cpf})
    
    if(cadastroEmpresa) 
      user.id_empresa = cadastroEmpresa.id_empresa
    else
      throw Error('Erro ao cadastrar empresa')

      
    return userData.saveUser(user)
  };


} 
