import { Empresa } from '../utils/types';
import { FaceDenteData } from '../data/faceDenteData';
import { Request, Response, NextFunction } from 'express';

const faceDenteData = new FaceDenteData();

export class FaceDenteController {
  getFaceDente(dente: any) {

    return faceDenteData.getFaceDenteById(dente);
  };

  // async getPacienteById(id_paciente: number) {
  //   const paciente = await pacienteData.getPacienteById(id_paciente);
  //   if (!paciente) throw new Error('User not found');
  //   return paciente;

  // }

  // async savePaciente(paciente: any) {
  //   const existingPaciente = await pacienteData.getPacienteByCpf(String(paciente.cpf));
  //   if (existingPaciente) throw new Error('Já existe uma um paciente cadastrado com esse CPF');

  //   return pacienteData.savePaciente(paciente);
  // }

  // async deletePaciente(id_paciente: number) {

  //   return await pacienteData.deletePaciente(id_paciente);
  // }
}
