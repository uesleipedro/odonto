import { Empresa } from '../utils/types';
import { EmpresaData } from '../data/empresaData';
import { Request, Response, NextFunction } from 'express';

const empresaData = new EmpresaData();

export class EmpresaController {
  getEmpresas() {

    return empresaData.getEmpresas();
  };

  async getEmpresaById(id_empresa: number){
    const empresa = await empresaData.getEmpresaById(id_empresa);
    if (!empresa) throw new Error('User not found');
    return empresa;

  }

  async saveEmpresa(empresa: any) {
    console.log('empresa: ', empresa)
    const existingEmpresa = await empresaData.getEmpresaByCnpjCpf(String(empresa.cnpj_cpf));
    if (existingEmpresa) throw new Error('Já existe uma empresa cadastrada com esse CNPJ/CPF');

    return empresaData.saveEmpresa(empresa);
  };
}

