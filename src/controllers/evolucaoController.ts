import { EvolucaoData } from '../data/evolucaoData'

const evolucaoData = new EvolucaoData()

export class EvolucaoController {
  getEvolucoes(dados: any) {

    return evolucaoData.getEvolucoes(dados);
  }

  async saveEvolucao(evolucao: any) {

    return evolucaoData.saveEvolucao(evolucao)
  }

  async updateEvolucao(evolucao: any) {
    try {
      await evolucaoData.updateEvolucao(evolucao)
    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  async deleteEvolucao(evolucao: any) {

    return await evolucaoData.deleteEvolucao(evolucao)
  }


} 
