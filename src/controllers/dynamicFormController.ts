import { DynamicFormData } from '../data/dynamicFormData'

const dynamicFormData = new DynamicFormData()

export class DynamicFormController {
  getDynamicForm(data: any) {

    return dynamicFormData.getDynamicForm(data)
  }

  async getFormList(data: any) {

    return await dynamicFormData.getFormList(data)
  }

  async saveDynamicForm(form: any) {
    return dynamicFormData.saveDynamicForm(form)
  }

  async saveDynamicFormData(data: any) {
    return dynamicFormData.saveDynamicFormData(data)
  }

  async deleteAccessLevel(form: any) {

    //return await accessLevelData.deleteAccessLevel(access_level)
  }

  async updateAccessLevel(access_level: any) {
    /*try {
      return accessLevelData.updateAccessLevel(access_level)
    } catch (error) {
      return error
    }*/
  }
} 
