import { Request, Response, NextFunction } from 'express';
import { ContasReceberData } from '../data/contasReceberData'

const contasReceberData = new ContasReceberData()

export class ContasReceberController {

  getContasReceberByPaciente(id_paciente: number, id_empresa: number) {

    return contasReceberData.getContasReceberByPaciente(id_paciente, id_empresa)
  }

  async saveContaReceber(conta: any) {

    return contasReceberData.saveContaReceber(conta);
  }

  async updateDataPagamento(pagamento: any) {
    try {
      await contasReceberData.updateDataPagamento(pagamento)
    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  async estornoPagamento(dados: any) {
    try {
      await contasReceberData.estornoPagamento(dados)
    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  async deleteContasReceber(id_pagamento: number) {

    return await contasReceberData.deleteContasReceber(id_pagamento);
  }

}
