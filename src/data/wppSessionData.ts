import db from '../infra/database'

export class WppSessionData {
  getWppSession(data: any) {
    const response = db.query('SELECT * FROM odonto.wpp_sessions WHERE id_empresa = $1 AND id_user = $2', [data.id_empresa, data.id_user])
    return response
  }

  saveWppSession(data: any) {
    return db.one('INSERT INTO odonto.wpp_sessions (id_empresa, id_user, session_name, session_data) VALUES ($1, $2, $3, $4) returning *',
      [data.id_empresa, data.id_user, data.session_name, data.session_data])
  }

  deleteWppSession(data: any) {
    return db.none('DELETE FROM odonto.wpp_sessions WHERE id_empresa = $1 AND id_user = $2',
      [data.id_empresa, data.id_user])
  }

}
