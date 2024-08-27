import db from '../infra/database'

export class EvolucaoData {
  getEvolucoes(dados: any) {
    const response = db.query(
      `SELECT 
        e.id_evolucao,
        e.id_paciente,
        e.texto,
        e.id_profissional,
        e.id_empresa,
        u.nome
      FROM odonto.evolucoes e
      INNER JOIN odonto.user u ON e.id_profissional = u.id_user
      WHERE e.id_empresa = $1 AND e.id_paciente = $2`, [dados.id_empresa, dados.id_paciente])
    return response
  }

  saveEvolucao(evolucao: any) {
    return db.one('INSERT INTO odonto.evolucoes (id_paciente, texto, id_profissional, id_empresa) VALUES ($1, $2, $3, $4) returning *',
      [evolucao.id_paciente, evolucao.texto, evolucao.id_profissional, evolucao.id_empresa])
  }
}
