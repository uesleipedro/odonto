import { EvolucaoData } from '../data/evolucaoData'
import { Request, Response, NextFunction } from 'express'

const evolucaoData = new EvolucaoData()

export class EvolucaoController {
  getEvolucoes(dados: any) {

    return evolucaoData.getEvolucoes(dados);
  }

  async saveEvolucao(evolucao: any) {
   
    return evolucaoData.saveEvolucao(evolucao) 
  };


} 
