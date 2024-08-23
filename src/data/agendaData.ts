import db from '../infra/database'

export class AgendaData {
    getAgenda(id_empresa: number) {
        return db.query(`
          SELECT 
            a.id_agenda as id, 
            a.descricao as title, 
            to_char(a.start, 'YYYY-MM-DD"T"HH24:MI:SS') as start, 
            to_char(a."end", 'YYYY-MM-DD"T"HH24:MI:SS') as end, 
            a.id_empresa, 
            a.id_paciente, 
            p.nome,
            a.id_profissional, 
            u.nome as nome_profissional,
            a.obs, 
            a.descricao, 
            a.dia_inteiro, 
            a.status 
          FROM odonto.agenda a
          INNER JOIN odonto.paciente p ON a.id_paciente = p.id_paciente
          INNER JOIN odonto.user u ON u.id_user = a.id_profissional
          WHERE a.id_empresa = ${id_empresa}`)
    }

    async saveAgenda(agenda: any) {
        return db.one(`INSERT INTO odonto.agenda (id_empresa, id_paciente, id_profissional, start, "end", descricao, obs, dia_inteiro, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id_agenda`,
            [agenda.id_empresa, agenda.id_paciente, agenda.id_profissional, agenda.start, agenda.end, agenda.descricao, agenda.obs, agenda.dia_inteiro, agenda.status])
    }

  async updateAgenda(agenda: any) {
    return db.none(`UPDATE odonto.agenda SET id_paciente = $2, id_profissional = $3, start = $4, "end" = $5, descricao = $6, obs = $7, dia_inteiro = $8, status = $9 WHERE id_agenda = $1`,
      [agenda.id, agenda.id_paciente, agenda.id_profissional, agenda.start, agenda.end, agenda.descricao, agenda.obs, agenda.dia_inteiro, agenda.status])
  }

  async updateDataHora(agenda: any) {
    return db.none(`UPDATE odonto.agenda SET start = $2, "end" = $3 WHERE id_agenda = $1`,
      [agenda.id_agenda, agenda.start, agenda.end])
  }

  async deleteAgenda(agenda: any) {
    return db.none('DELETE FROM odonto.agenda WHERE id_agenda = $1 AND id_empresa = $2', [Number(agenda.id_agenda), Number(agenda.id_empresa)]); 
  }
}
