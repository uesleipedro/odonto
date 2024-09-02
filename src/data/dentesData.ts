import db from '../infra/database'

export class DentesData {
  getDentesComProcedimento(dados: any) {
    return db.query(`
      SELECT 
        jsonb_object_agg(
          CAST(d.numero_dente as character varying), 
          CASE 
            WHEN p.dente IS NULL THEN 'none'
            ELSE '#F0EB7D'
          END
        ) AS dentes
      FROM 
        odonto.dentes d
      LEFT JOIN 
        odonto.procedimento p ON d.numero_dente = CAST(p.dente as integer) 
        AND p.id_empresa = $1
        AND p.id_paciente = $2
    `, [dados.id_empresa, dados.id_paciente])
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
