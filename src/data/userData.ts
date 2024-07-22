import db from '../infra/database';

export class UserData {
  getUsers() {
    const response = db.query('SELECT * FROM odonto.user');
    return response;
  };

  getUserByEmail(email: string) {
    return db.oneOrNone(`
      SELECT 
	      u.email,
	      u.nome,
	      u.senha,
	      u.id_empresa,
	      e.razao_social,
	      e.nome_fantasia,
	      e.cnpj_cpf
      FROM odonto.user u
      INNER JOIN odonto.empresa e
      ON u.id_empresa = e.id_empresa
      WHERE email= $1`, [email]
    ) 
  }

  saveUser(user: any) {
    return db.one('INSERT INTO odonto.user (email, nome, id_empresa, senha) VALUES ($1, $2, $3, $4) returning *',
      [user.email, user.nome, user.id_empresa, user.senha]);
  };
}
