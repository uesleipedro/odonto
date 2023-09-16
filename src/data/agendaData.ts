import db from '../infra/database'
//import { Empresa } from '../utils/types'

export class AgendaData {
    getAgenda() {
        return db.query('SELECT * FROM odonto.agenda')
    }

    async saveAgenda(agenda: any) {

        return db.one('INSERT INTO odonto.agenda (id_empresa, id_paciente, id_profissional, start_date_time, obs, id_metodo_pagamento, total_pagamento_servico, desconto, status) VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7, $8) returning id_agenda',
        [agenda.id_empresa, agenda.id_paciente, agenda.id_profissional, agenda.obs, agenda.id_metodo_pagamento, agenda.total_pagamento_servico, agenda.desconto, agenda.status])
    }

}