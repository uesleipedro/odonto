import { Empresa } from '../utils/types';
import { PacienteData } from '../data/pacienteData';
import { Request, Response, NextFunction } from 'express';

const pacienteData = new PacienteData();

export class PacienteController {
  getPacientes(id_empresa: number) {

    return pacienteData.getPacientes(id_empresa);
  }

  async getPacienteById(id_paciente: number, id_empresa: number) {
    const paciente = await pacienteData.getPacienteById(id_paciente, id_empresa);
    if (!paciente) throw new Error('User not found');
    return paciente
  }

  async savePaciente(paciente: any) {
    const existingPaciente = await pacienteData.getPacienteByCpf(String(paciente.cpf));
    if (existingPaciente) throw new Error('Já existe uma um paciente cadastrado com esse CPF');

    return pacienteData.savePaciente(paciente);
  }

  async updatePaciente(paciente: any) {
    // let existingPaciente: any = this.getAnamneseById(anamnese.id_anamnese)
    // if (existingAnamnese === '[]') throw new Error('Anamnese não encontrada no banco de dados')
    try {
      await pacienteData.updatePaciente(paciente)
    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  async deletePaciente(id_paciente: number) {

    return await pacienteData.deletePaciente(id_paciente);
  }
}
