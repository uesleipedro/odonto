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



  saveEmpresa(empresa: any) {

    return db.one('INSERT INTO odonto.empresa (razao_social, nome_fantasia, cnpj_cpf, cep, logradouro, bairro, cidade, uf) VALUES ($1, $1, $2, $3, $4, $5, $6, $7) returning *',
      [empresa.razao_social, empresa.cnpj_cpf, empresa.cep, empresa.logradouro, empresa.bairro, empresa.localidade, empresa.uf])
  }

  async updateEmpresa(empresa: any) {
    console.log("updateEmpresa", empresa)
    return db.none(`UPDATE odonto.empresa SET 
        razao_social = $2, 
        nome_fantasia = $3, 
        cnpj_cpf = $4,
        telefone = $5,
        cep = $6,
        logradouro = $7,
        bairro = $8,
        cidade = $9,
        uf = $10,
        email = $11,
        celular = $12,
        numero = $13
      WHERE id_empresa = $1`,
      [
        empresa.id_empresa,
        empresa.razao_social,
        empresa.nome_fantasia,
        empresa.cnpj_cpf,
        empresa.telefone,
        empresa.cep,
        empresa.logradouro,
        empresa.bairro,
        empresa.cidade,
        empresa.uf,
        empresa.email,
        empresa.celular,
        empresa.numero
      ])
  }


}
