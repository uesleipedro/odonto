import db from '../infra/database'

export class UserData {
  getUsers() {
    const response = db.query('SELECT * FROM odonto.user')
    return response
  }

  async getUserByEmpresa (id_empresa: number) {
    return db.query('SELECT id_user as value, nome as label FROM odonto.user WHERE id_empresa = $1', [id_empresa])
  }
  async getUserByEmpresa2 (id_empresa: number) {
    return db.query('SELECT * FROM odonto.user WHERE id_empresa = $1', [id_empresa])
  }

  getUserByEmail(email: string) {
    return db.oneOrNone(`
      SELECT 
        u.id_user,
	      u.email,
	      u.nome,
	      u.senha,
	      u.id_empresa,
        u.token_to_reset_password,
	      e.razao_social,
	      e.nome_fantasia,
	      e.cnpj_cpf
      FROM odonto.user u
      INNER JOIN odonto.empresa e
      ON u.id_empresa = e.id_empresa
      WHERE email= $1`, [email]
    ) 
  }

  async addTokenResetPassword(email: string, token: string){
    return await db.oneOrNone(`UPDATE odonto.user SET token_to_reset_password = $2 WHERE email = $1 RETURNING *`,
      [email, token])
  }

  async updatePassword(email: string, senha: string){
    return db.none(`UPDATE odonto.user SET senha = $2 WHERE email =$1`,
      [email, senha])
  }

  async deleteUser(id_user: number, id_empresa: number) {
    return db.none('DELETE FROM odonto.user WHERE id_user = $1 AND id_empresa = $2', [id_user, id_empresa]); 
  }

  saveUser(user: any) {
    return db.one('INSERT INTO odonto.user (email, nome, id_empresa, senha, access_levels) VALUES ($1, $2, $3, $4, $5) returning *',
      [user.email, user.nome, user.id_empresa, user.senha, user.access_levels])
  }
}
