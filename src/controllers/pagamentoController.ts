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

  async updateDataPagamento(pagamento: any) {
    try {
      await pagamentoData.updateDataPagamento(pagamento)
    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  async estornoPagamento(id_pagamento: any) {
    try {
      await pagamentoData.estornoPagamento(id_pagamento)
    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  async deletePagamento(id_orcamento: number) {

    return await pagamentoData.deletePagamento(id_orcamento);
  }
}
