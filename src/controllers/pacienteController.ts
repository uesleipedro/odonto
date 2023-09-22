import { Empresa } from '../utils/types';
import { PacienteData } from '../data/pacienteData';
import { Request, Response, NextFunction } from 'express';

const pacienteData = new PacienteData();

export class PacienteController {
  getPacientes() {

    return pacienteData.getPacientes();
  };

  async getPacienteById(id_paciente: number){
    const paciente = await pacienteData.getPacienteById(id_paciente);
    if (!paciente) throw new Error('User not found');
    return paciente;

  }

  async savePaciente(paciente: any) {
    const existingPaciente = await pacienteData.getPacienteByCpf(String(paciente.cpf));
    if (existingPaciente) throw new Error('Já existe uma um paciente cadastrado com esse CPF');

    return pacienteData.savePaciente(paciente);
  }

  async deletePaciente(id_paciente: number) {

    return await pacienteData.deletePaciente(id_paciente);
  }
}
