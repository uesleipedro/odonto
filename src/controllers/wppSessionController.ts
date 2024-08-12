import { WppSessionData } from '../data/wppSessionData'
import { Request, Response, NextFunction } from 'express'

const wppSessionData = new WppSessionData()

export class WppSessionController {
  getWppSession(data: any) {

    return wppSessionData.getWppSession(data)
  }

  async saveWppSession(data: any) {
        
    return wppSessionData.saveWppSession(data) 
  }

 async deleteWppSession(data: any) {
        
    return wppSessionData.deleteWppSession(data) 
  }

} 
