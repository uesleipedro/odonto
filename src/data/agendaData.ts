import db from '../infra/database'
//import { Empresa } from '../utils/types'

export class AgendaData {
    getAgenda() {
        // return db.query('SELECT * FROM odonto.agenda')
        return db.query(`SELECT id_agenda as id, descricao as title, to_char(start_date_time, 'YYYY-MM-DD"T"HH24:MI:SS') as start, to_char(end_date_time, 'YYYY-MM-DD"T"HH24:MI:SS') as end, id_empresa, id_paciente, id_profissional, obs, descricao, dia_inteiro, status FROM odonto.agenda`)
    }

    async saveAgenda(agenda: any) {

        return db.one('INSERT INTO odonto.agenda (id_empresa, id_paciente, id_profissional, start_date_time, end_date_time, descricao, obs, dia_inteiro, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id_agenda',
            [agenda.id_empresa, agenda.id_paciente, agenda.id_profissional, agenda.start_date_time, agenda.end_date_time, agenda.descricao, agenda.obs, agenda.dia_inteiro, agenda.status])
    }

}
