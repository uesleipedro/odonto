import { AccessLevelScreenData } from '../data/accessLevelScreenData'
import { Request, Response, NextFunction } from 'express'

const accessLevelScreenData = new AccessLevelScreenData()

export class AccessLevelScreenController {
  getAccessLevelScreen(data: any) {
    return accessLevelScreenData.getAccessLevelScreen(data)
  }

  async saveAccessLevelScreen(data: any) {
    return accessLevelScreenData.saveAccessLevelScreen(data)
  }

  /*async updateAccessLevelScreen(access_level: any) {
    try {
      return accessLevelScreenData.updateAccessLevelScreen(access_level)
    } catch (error) {
      return error
    }
  }
*/
  async deleteAccessLevelScreen(access_level: any) {

    return await accessLevelScreenData.deleteAccessLevelScreen(access_level)
  }
} 
