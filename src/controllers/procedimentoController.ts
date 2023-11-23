//import { Empresa } from '../utils/types'
import { ProcedimentoData } from '../data/procedimentoData'
import { Request, Response, NextFunction } from 'express'

const procedimentoData = new ProcedimentoData()

export class ProcedimentoController {
  getProcedimento() {

    return procedimentoData.getProcedimento()
  }

  async saveProcedimento(procedimento: any) {
    let existingAgenda
    //if (existingAgenda =! null) throw new Error('Já existe uma empresa cadastrada com esse CNPJ/CPF')
    try {

      const proc = await procedimentoData.saveProcedimento(procedimento)
      if (!proc) throw new Error("Erro ao cadastrar procedimento")

    } catch (e) {
      console.error(e)
      throw new Error()
    }

  };

  async deleteProcedimento(id_procedimento: number) {

    return await procedimentoData.deleteProcedimento(id_procedimento);
  }
}