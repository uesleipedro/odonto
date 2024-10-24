import db from '../infra/database'
import { Empresa } from '../utils/types'

export class DenteData {
  getDentes() {
    return db.query('SELECT distinct dente as value, dente as label FROM odonto.faces_dente order by dente')
  }

  getDentesComProcedimento(dados: any) {
    return db.query('select array_agg(DISTINCT dente) AS dentes FROM odonto.procedimento WHERE id_paciente = $1 AND id_empresa = $2', [dados.id_paciente, dados.id_empresa])
  }
  // getPacienteById(id_paciente: number) {

  //   return db.oneOrNone('SELECT * FROM odonto.paciente WHERE id_paciente = $1', [id_paciente])
  // }

  // getPacienteByCpf(cpf: string) {

  //   return db.oneOrNone('SELECT * FROM odonto.paciente WHERE cpf = $1', [cpf])
  // }



  // savePaciente(paciente: any) {

  //   return db.one('INSERT INTO odonto.paciente (nome, cpf, telefone_fixo, telefone_movel, dt_nascimento, rg, sexo, estado_civil, email, plano_saude, numero_carteirinha, nome_responsavel, telefone_responsavel, email_responsavel) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning *',
  //     [paciente.nome, paciente.cpf, paciente.telefone_fixo, paciente.telefone_movel, paciente.dt_nascimento, paciente.rg, paciente.sexo, paciente.estado_civil, paciente.email, paciente.plano_saude, paciente.numero_carteirinha, paciente.nome_responsavel, paciente.telefone_responsavel, paciente.email_responsavel]);
  // }

  // deletePaciente(id_paciente: number) {

  //   return db.none('DELETE FROM odonto.paciente WHERE id_paciente = $1', [id_paciente]);
  // }
}
