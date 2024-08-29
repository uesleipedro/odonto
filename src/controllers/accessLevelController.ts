import { AccessLevelData } from '../data/accessLevelData'

const accessLevelData = new AccessLevelData()

export class AccessLevelController {
  getAccessLevels(id_empresa: number) {

    return accessLevelData.getAccessLevels(id_empresa);
  }

  async saveAccessLevel(access_level: any) {
    /*const existingUser = await accessLevelData.getUserByEmail(user.email)
    if (existingUser) throw new Error(JSON.stringify({ status: 400, error: 'Email already exists' }))
    
    const saltRound = 8;
    user.senha = await bcrypt.hash(user.senha, saltRound)

    const cadastroEmpresa = await empresaController.saveEmpresa({razao_social: user.razao_social, cnpj_cpf: user.cnpj_cpf})
    
    if(cadastroEmpresa) 
      user.id_empresa = cadastroEmpresa.id_empresa
    else
      throw Error('Erro ao cadastrar empresa')

      */

    return accessLevelData.saveAccessLevel(access_level)
  };


} 
