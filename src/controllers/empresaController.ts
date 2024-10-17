import { NextFunction, response } from 'express'
import { EmpresaData } from '../data/empresaData'
import AppError from '../utils/appError'

const empresaData = new EmpresaData()

export class EmpresaController {
  getEmpresas() {

    return empresaData.getEmpresas()
  }

  async getEmpresaById(id_empresa: number) {
    const empresa = await empresaData.getEmpresaById(id_empresa)
    if (!empresa) throw new Error('User not found')
    return empresa

  }

  async saveEmpresa(empresa: any, next: NextFunction) {
    const existingEmpresa = await empresaData.getEmpresaByCnpjCpf(String(empresa.cnpj_cpf))

    if (existingEmpresa)
      next(new AppError('Já existe uma empresa cadastrada com esse CNPJ/CPF', 409))

    return await empresaData.saveEmpresa(empresa)

  }

  async updateEmpresa(empresa: any) {
    return await empresaData.updateEmpresa(empresa)
  }

}

