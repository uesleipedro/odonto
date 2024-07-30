//import { Empresa } from '../utils/types'
import { ProcedimentoOrcamentoData } from '../data/procedimentoOrcamentoData'
import { Request, Response, NextFunction } from 'express'

const procedimentoOrcamentoData = new ProcedimentoOrcamentoData()

export class ProcedimentoOrcamentoController {
  getProcedimentoOrcamento() {

    return procedimentoOrcamentoData.getProcedimentoOrcamento()
  }

  getProcedimentoByOrcamento(id_orcamento: any) {

    return procedimentoOrcamentoData.getProcedimentoByOrcamento(id_orcamento)
  }

  async saveProcedimentoOrcamento(procedimento_orcamento: any) {
    let existingAgenda
    //if (existingAgenda =! null) throw new Error('Já existe uma empresa cadastrada com esse CNPJ/CPF')
    try {

      const proc = await procedimentoOrcamentoData.saveProcedimentoOrcamento(procedimento_orcamento)
      if (!proc) throw new Error("Erro ao cadastrar procedimento")

    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }
  /*
    async updateProcedimento(procedimento: any) {
      let existingAgenda: any = this.getProcedimentoById(procedimento.id_procedimento)
      if (existingAgenda === '[]') throw new Error('Procedimento não encontrado no banco de dados')
      try {
        await procedimentoData.updateProcedimento(procedimento)
      } catch (e) {
        console.error(e)
        throw new Error()
      }
  
    }
  */
    async deleteProcedimentoOrcamentoByOrcamento(id_orcamento: number, id_empresa: number) {
  
      return await procedimentoOrcamentoData.deleteProcedimentoOrcamentoByOrcamento(id_orcamento, id_empresa);
    }
  
}
