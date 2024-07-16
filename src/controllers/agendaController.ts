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
        //throw new Error ()
        console.error(e)
    }

  };

  async updateAgenda(agenda: any) {
    //let existingAnamnese: any = this.getAnamneseById(anamnese.id_anamnese)
    //if (existingAnamnese === '[]') throw new Error('Anamnese não encontrada no banco de dados')
    console.log("agenda", agenda)
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
