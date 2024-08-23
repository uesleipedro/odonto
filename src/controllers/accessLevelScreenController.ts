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


} 
