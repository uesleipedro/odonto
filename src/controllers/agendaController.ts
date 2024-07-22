import { Empresa } from '../utils/types'
import { AgendaData } from '../data/agendaData'
import { Request, Response, NextFunction } from 'express'

const agendaData = new AgendaData()

export class AgendaController {
  getAgenda(id_empresa: number) {

    return agendaData.getAgenda(id_empresa)
  }

  async saveAgenda(agenda: any) {
    let existingAgenda
    try{
            
       const a = await agendaData.saveAgenda(agenda)
       if(!a) throw new Error("Erro aqui")

    }catch(e){
        //throw new Error ()
        console.error(e)
    }

  };

  async updateAgenda(agenda: any) {
    try {
      await agendaData.updateAgenda(agenda)
    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  async updateDataHora(agenda: any) {
    try {
      await agendaData.updateDataHora(agenda)
    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  async deleteAgenda(id_agenda: number) {

    return await agendaData.deleteAgenda(id_agenda);
  }
}
