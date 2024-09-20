import db from '../infra/database'

export class EfiCredentialData {
  getCredential(id_empresa: number) {
    const response = db.query(
      `SELECT * from odonto.efi_credential WHERE id_empresa = $1`, [id_empresa])
    return response
  }

  async updateCredential(data: any) {
    return db.none(`UPDATE odonto.efi_credential SET client_id = $2, client_secret = $3, certificate_path = $4, iv_client_id = $5, iv_client_secret = $6, sandbox = $7 WHERE id_empresa = $1`,
      [data.id_empresa, data.client_id?.encryptedData, data.client_secret?.encryptedData, data.certificate_path, data?.client_id?.iv, data?.client_secret?.iv, data?.sandbox])
  }

  saveCredential(data: any) {
    return db.one('INSERT INTO odonto.efi_credential (id_empresa, client_id, client_secret, certificate_path, iv_client_id, iv_client_secret, sandbox) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *',
      [data.id_empresa, data?.client_id?.encryptedData, data?.client_secret?.encryptedData, data.certificate_path, data?.client_id?.iv, data?.client_secret?.iv, data?.sandbox])
  }

  async deleteCredential(id_credential: any) {
    return db.none('DELETE FROM odonto.efi_credential WHERE id_empresa = $1', [Number(id_credential)])
  }

}
