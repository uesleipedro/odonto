import { AccessLevelData } from '../data/accessLevelData'

const accessLevelData = new AccessLevelData()

export class AccessLevelController {
  getAccessLevels(id_empresa: number) {
    return accessLevelData.getAccessLevels(id_empresa);
  }

  async saveAccessLevel(access_level: any) {
    return accessLevelData.saveAccessLevel(access_level)
  }

  async deleteAccessLevel(access_level: any) {

    return await accessLevelData.deleteAccessLevel(access_level)
  }

  async updateAccessLevel(access_level: any) {
    try {
      return accessLevelData.updateAccessLevel(access_level)
    } catch (error) {
      return error
    }
  }
} 
