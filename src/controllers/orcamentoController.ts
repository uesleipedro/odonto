//import { Empresa } from '../utils/types'
import { OrcamentoData } from '../data/orcamentoData'
import { Request, Response, NextFunction } from 'express'

const orcamentoData = new OrcamentoData()

export class OrcamentoController {
  getOrcamento() {
    console.log('entrou controller')
    return orcamentoData.getOrcamento()
  }

  // getProcedimentoById(id_procedimento: any) {

  //   return procedimentoData.getProcedimentoById(id_procedimento)
  // }

  async saveOrcamento(orcamento: any) {
    let existingAgenda
    //if (existingAgenda =! null) throw new Error('Já existe uma empresa cadastrada com esse CNPJ/CPF')
    try {

      const success = await orcamentoData.saveOrcamento(orcamento)
      if (!success) throw new Error("Erro ao cadastrar orçamento")
      return success

    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  // async updateProcedimento(procedimento: any) {
  //   let existingAgenda: any = this.getProcedimentoById(procedimento.id_procedimento)
  //   if (existingAgenda === '[]') throw new Error('Procedimento não encontrado no banco de dados')
  //   try {
  //     await procedimentoData.updateProcedimento(procedimento)
  //   } catch (e) {
  //     console.error(e)
  //     throw new Error()
  //   }

  // }

  // async deleteProcedimento(id_procedimento: number) {

  //   return await procedimentoData.deleteProcedimento(id_procedimento);
  // }
}