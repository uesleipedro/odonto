//import { Empresa } from '../utils/types'
import { ProcedimentoListData } from '../data/procedimentoListData'
import { Request, Response, NextFunction } from 'express'

const procedimentoListData = new ProcedimentoListData()

export class ProcedimentoListController {
  getProcedimentoList() {

    return procedimentoListData.getProcedimentoList()
  }

  async saveProcedimentoList(procedimento_list: any) {
    let existingAgenda
    //if (existingAgenda =! null) throw new Error('Já existe uma empresa cadastrada com esse CNPJ/CPF')
    try {

      const proc = await procedimentoListData.saveProcedimentoList(procedimento_list)
      if (!proc) throw new Error("Erro ao cadastrar procedimento")

    } catch (e) {
      console.error(e)
      throw new Error()
    }

  };

  async deleteProcedimentoList(id_procedimento_list: number) {

    return await procedimentoListData.deleteProcedimentoList(id_procedimento_list);
  }
}