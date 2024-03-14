//import { Empresa } from '../utils/types'
import { PagamentoData } from '../data/pagamentoData'
import { Request, Response, NextFunction } from 'express'

const pagamentoData = new PagamentoData()

export class PagamentoController {
  getPagamento() {
    return pagamentoData.getPagamento()
  }

  getPagamentoByPaciente(id_paciente: any) {

    return pagamentoData.getPagamentoByPaciente(id_paciente)
  }

  async savePagamento(pagamento: any) {
    let existingAgenda
    //if (existingAgenda =! null) throw new Error('Já existe uma empresa cadastrada com esse CNPJ/CPF')
    try {

      const success = await pagamentoData.savePagamento(pagamento)
      if (!success) throw new Error("Erro ao cadastrar pagamento")
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