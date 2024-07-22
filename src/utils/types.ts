export interface User{
  id_user: number;
  email: string;
  nome: string;
  id_empresa: number;
  senha: string;
  razao_social: string;
  cnpj_cpf: string;
}

export interface LoginData{
  email: string;
  senha: string;
}

export interface Empresa{
  razao_social: string;
  nome_fantasia: string;
  cnpj_cpf: string;
  telefone: string;
  logo: string;
}
