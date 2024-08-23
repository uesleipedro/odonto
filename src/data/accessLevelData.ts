import db from '../infra/database'

export class AccessLevelData {
  getAccessLevels(id_empresa: number) {
    const response = db.query('SELECT * FROM odonto.access_levels WHERE id_empresa = $1 ORDER BY level_name ASC', [id_empresa])
    return response
  }

  saveAccessLevel(access_level: any) {
    return db.one('INSERT INTO odonto.access_levels (level_name, description, id_empresa) VALUES ($1, $2, $3) returning *',
      [access_level.level_name, access_level.description, access_level.id_empresa])
  }
}
