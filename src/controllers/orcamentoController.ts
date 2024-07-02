//import { Empresa } from '../utils/types'
import { OrcamentoData } from '../data/orcamentoData'
import { Request, Response, NextFunction } from 'express'

const orcamentoData = new OrcamentoData()

export class OrcamentoController {
  getOrcamento() {
    console.log('entrou controller')
    return orcamentoData.getOrcamento()
  }

  getOrcamentoByPacienet(id_paciente: any) {

    return orcamentoData.getOrcamentoByPaciente(id_paciente)
  }

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

  async updateStatusOrcamento(orcamento: any) {
    console.log('----------------  controller', orcamento)
    try {
      await orcamentoData.updateStatusOrcamento(orcamento)
    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  async estornarOrcamento(id_orcamento: any) {
    try {
      await orcamentoData.estornarOrcamento(id_orcamento)
    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  async deleteOrcamento(id_orcamento: number) {
console.log('delete controller', id_orcamento)
    return await orcamentoData.deleteOrcamento(id_orcamento);
  }
}