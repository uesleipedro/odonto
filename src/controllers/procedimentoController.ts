//import { Empresa } from '../utils/types'
import { ProcedimentoData } from '../data/procedimentoData'
import { Request, Response, NextFunction } from 'express'

const procedimentoData = new ProcedimentoData()

export class ProcedimentoController {
  getProcedimento() {

    return procedimentoData.getProcedimento()
  }

  getProcedimentoById(id_procedimento: any) {

    return procedimentoData.getProcedimentoById(id_procedimento)
  }

  getProcedimentoByPaciente(id_paciente: any) {
    console.log('entrou controller')
    return procedimentoData.getProcedimentoByPaciente(id_paciente)
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

  }

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

  async deleteProcedimento(id_procedimento: number) {

    return await procedimentoData.deleteProcedimento(id_procedimento);
  }
}