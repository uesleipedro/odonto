import { Empresa } from '../utils/types';
import { AnamneseData } from '../data/anamneseData';
import { Request, Response, NextFunction } from 'express';

const anamneseData = new AnamneseData();

export class AnamneseController {
  getAnamneses() {

    return anamneseData.getAnamneses();
  };

  async getAnamneseById(id_anamnese: number) {
    const anamnese = await anamneseData.getAnamneseById(id_anamnese);
    if (!anamnese) throw new Error('Anamnese not found');
    return anamnese;

  }

  async getAnamneseByPaciente(id_paciente: number) {
    const anamnese = await anamneseData.getAnamneseByPaciente(id_paciente)
    if (!anamnese) throw new Error('Anamnese not found')
    return anamnese

  }

  async getCheckExists(id_paciente: number) {
    const anamnese = await anamneseData.getCheckExistes(id_paciente)
    console.log("xxxxxxxxxxxxx: ", anamnese)
    if (!anamnese) throw new Error('Anamnese not found')
    return anamnese

  }

  async saveAnamnese(anamnese: any) {
    // const existingAnamnese = await pacienteData.getPacienteByCpf(String(paciente.cpf));
    // if (existingPaciente) throw new Error('Já existe uma um paciente cadastrado com esse CPF');

    return anamneseData.saveAnamnese(anamnese);
  }

  async updateAnamnese(anamnese: any) {
    console.log('entrou na controller')
    let existingAnamnese: any = this.getAnamneseById(anamnese.id_anamnese)
    if (existingAnamnese === '[]') throw new Error('Anamnese não encontrada no banco de dados')
    try {
      await anamneseData.updateAnamnese(anamnese)
    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  async deleteAnamnese(id_anamnese: number) {

    //  return await anamneseData.deleteanamnese(id_anamnese);
  }
}
