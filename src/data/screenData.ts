import db from '../infra/database'

export class ScreenData {
  getScreens(id_empresa: number) {
    return db.query('SELECT id_screen as value, path as label FROM odonto.screen WHERE id_empresa = $1', [id_empresa])
  }

}
