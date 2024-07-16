import { Empresa } from '../utils/types';
import { DenteData } from '../data/denteData';
import { Request, Response, NextFunction } from 'express';
import { ContasReceberData } from '../data/contasReceberData'

const contasReceberData = new ContasReceberData()

export class ContasReceberController {
  //   getDentes() {

  //     return denteData.getDentes();
  //   };

  getContasReceberByPaciente(id_paciente: any) {

    return contasReceberData.getContasReceberByPaciente(id_paciente)
  }

  async saveContaReceber(conta: any) {
    // const existingPaciente = await pacienteData.getPacienteByCpf(String(paciente.cpf));
    // if (existingPaciente) throw new Error('Já existe uma um paciente cadastrado com esse CPF');

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
