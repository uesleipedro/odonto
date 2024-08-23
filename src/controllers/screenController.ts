import { Request, Response, NextFunction } from 'express'
import { ScreenData } from '../data/screenData'

const screenData = new ScreenData()

export class ScreenController {
  getScreens(id_empresa: number) {

    return screenData.getScreens(id_empresa);
  }

}
