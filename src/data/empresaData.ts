import db from '../infra/database'
import { Empresa } from '../utils/types'

export class EmpresaData {
  getEmpresas() {
    return db.query('SELECT * FROM odonto.empresa');
  };

  getEmpresaById(id_empresa: number) {

    return db.oneOrNone('SELECT * FROM odonto.empresa WHERE id_empresa = $1', [id_empresa]);
  };

  getEmpresaByCnpjCpf(cnpj_cpf: string) {

    return db.oneOrNone('SELECT * FROM odonto.empresa WHERE cnpj_cpf = $1', [cnpj_cpf]);
  };



  saveEmpresa(empresa: Empresa) {

    return db.one('INSERT INTO odonto.empresa (razao_social, nome_fantasia, cnpj_cpf, telefone, logo) VALUES ($1, $2, $3, $4, $5) returning *',
      [empresa.razao_social, empresa.nome_fantasia, empresa.cnpj_cpf, empresa.telefone, empresa.logo]);
  };
}
