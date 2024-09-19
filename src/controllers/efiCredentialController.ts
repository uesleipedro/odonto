import { EfiCredentialData } from '../data/efiCredentialData'
import { encrypt, decrypt } from "../utils/encryptDecrypt"

const efiCredentialData = new EfiCredentialData()

export class EfiCredentialController {
  async getEfiCredential(data: any) {

    let res = await efiCredentialData.getCredential(data)
    const encryptedClientId = {
      encryptedData: res[0].client_id,
      iv: res[0].iv_client_id
    }
    const encryptedClientSecret = {
      encryptedData: res[0].client_secret,
      iv: res[0].iv_client_secret
    }
    res[0].client_id = decrypt(encryptedClientId)
    res[0].client_secret = decrypt(encryptedClientSecret)
    return res
  }

  async saveEfiCredential(data: any) {
    data.client_id = encrypt(data.client_id)
    data.client_secret = encrypt(data.client_secret)
    return efiCredentialData.saveCredential(data)
  }

  async updateEfiCredential(data: any) {
    try {
      data.client_id = encrypt(data.client_id)
      data.client_secret = encrypt(data.client_secret)
      return await efiCredentialData.updateCredential(data)
    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  async deleteEfiCredential(data: any) {

    return await efiCredentialData.deleteCredential(data)
  }


} 
