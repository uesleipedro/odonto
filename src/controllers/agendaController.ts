import { Empresa } from '../utils/types'
import { AgendaData } from '../data/agendaData'
import { Request, Response, NextFunction } from 'express'

const agendaData = new AgendaData()

export class AgendaController {
  getAgenda() {

    return agendaData.getAgenda()
  }

  async saveAgenda(agenda: any) {
    let existingAgenda
    //if (existingAgenda =! null) throw new Error('Já existe uma empresa cadastrada com esse CNPJ/CPF')
    try{
            
       const a = await agendaData.saveAgenda(agenda)
       console.log(a)
       if(!a) throw new Error("Erro aqui")

    }catch(e){
        throw new Error ('Deu ruim')
    }

  };
}