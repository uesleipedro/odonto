import db from '../infra/database'

export class OrcamentoData {
  getOrcamento() {
    return db.query(`
        SELECT  
            o.id_orcamento,
            o.id_empresa,
            o.id_profissional,
            (select nome from odonto.paciente where id_paciente = 1) as paciente,
            o.preco,
            o.date,
            o.status
        FROM odonto.orcamento o`)
  }

  getOrcamentoByPaciente(paciente: any) {
    return db.query(`
          SELECT
            o.id_orcamento,
            o.id_empresa,
            o.id_profissional,
            u.nome as nome_profissional,
            o.id_paciente,
            o.preco,
            o.date,
            o.status
          FROM odonto.orcamento o
            INNER JOIN odonto.user u ON u.id_user = o.id_profissional
          WHERE o.id_paciente = $1
          AND o.id_empresa = $2`, [Number(paciente.id_paciente), Number(paciente.id_empresa)])
  }

  async getOrcamentoView(id_orcamento: number, id_empresa: number) {
    return db.query(`
        SELECT 
		      pl.descricao AS procedimento,
		      po.id_orcamento,
		      po.preco AS preco_item,
		      po.id_empresa,
		      o.preco AS preco_total,
		      o.date AS data_orcamento,
		      o.id_profissional,
          u.nome as nome_profissional,
          pa.nome,
          pa.cpf,
          pa.telefone_movel,
          o.date,
          e.nome_fantasia,
          e.cnpj_cpf,
		      o.status,
          p.dente,
          p.face_dente
	      FROM
		      odonto.procedimento_orcamento po
	      INNER JOIN odonto.procedimento p ON p.id_procedimento = po.id_procedimento 
	      INNER JOIN odonto.procedimento_list pl ON pl.id_procedimento = p.id_procedimento_list 
	      INNER JOIN odonto.orcamento o ON o.id_orcamento = po.id_orcamento
        INNER JOIN odonto.paciente pa ON pa.id_paciente = o.id_paciente
        INNER JOIN odonto.empresa e ON e.id_empresa = o.id_empresa
        INNER JOIN odonto.user u ON u.id_user = o.id_profissional
	      WHERE po.id_orcamento = $1
        AND po.id_empresa = $2
      `, [id_orcamento, id_empresa])
  }

  async saveOrcamento(orcamento: any) {

    return db.one('INSERT INTO odonto.orcamento (id_empresa, id_profissional, id_paciente, preco, date, status) VALUES ($1, $2, $3, $4, NOW(), $5) returning id_orcamento',
      [orcamento.id_empresa, orcamento.id_profissional, orcamento.id_paciente, orcamento.preco, orcamento.status])
  }

  async updateStatusOrcamento(orcamento: any) {
    return db.none('UPDATE odonto.orcamento SET status = $2 WHERE id_orcamento = $1',
      [orcamento.id_orcamento, orcamento.status])
  }

  async estornarOrcamento(id_orcamento: any) {
    return db.none(`UPDATE odonto.orcamento SET status = 'Pendente pagamento' WHERE id_orcamento = $1`,
      [id_orcamento])
  }

  deleteOrcamento(id_orcamento: number) {
    return db.none('DELETE FROM odonto.orcamento WHERE id_orcamento = $1', [id_orcamento]);
  }

}
