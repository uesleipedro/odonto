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
        e.updated_at,
        u.nome
      FROM odonto.evolucoes e
      INNER JOIN odonto.user u ON e.id_profissional = u.id_user
      WHERE e.id_empresa = $1 AND e.id_paciente = $2 ORDER BY e.updated_at`, [dados.id_empresa, dados.id_paciente])
    return response
  }

  async updateEvolucao(evolucao: any) {
    console.log("updateEvolucao", evolucao)
    return db.none(`UPDATE odonto.evolucoes SET texto = $3, id_profissional = $4, updated_at = NOW() WHERE id_evolucao = $1 AND id_empresa = $2`,
      [evolucao.id_evolucao, evolucao.id_empresa, evolucao.texto, evolucao.id_profissional])
  }

  saveEvolucao(evolucao: any) {
    return db.one('INSERT INTO odonto.evolucoes (id_paciente, texto, id_profissional, id_empresa, updated_at) VALUES ($1, $2, $3, $4, NOW()) returning *',
      [evolucao.id_paciente, evolucao.texto, evolucao.id_profissional, evolucao.id_empresa])
  }
}
