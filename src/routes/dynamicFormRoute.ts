import { Request, Response, Router } from 'express'
import { DynamicFormController } from '../controllers/dynamicFormController'

const dynamicFormController = new DynamicFormController()
const router = Router()

router.get('/', async function(req: Request, res: Response, next) {
  try {
    const response = await dynamicFormController.getDynamicForm(req.query)
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
})

router.get('/formList', async function(req: Request, res: Response, next) {
  try {
    const response = await dynamicFormController.getFormList(req.query)
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
})

router.post('/', async function(req: Request, res: Response, next) {
  try {
    const response = await dynamicFormController.saveDynamicForm(req)
    res.status(201).json(response)
  } catch (e: any) {
    next(e)
  }
})

router.post('/data', async function(req: Request, res: Response, next) {
  try {
    const response = await dynamicFormController.saveDynamicFormData(req.body)
    res.status(201).json(response)
  } catch (e: any) {
    next(e)
  }
})

router.delete('/', async function(req: Request, res: Response, next) {
  /*try {
    const response = await accessLevelController.deleteAccessLevel(req.query)

    if (response.status === 'erro') {
      return res.status(400).json(response)
    }

    return res.status(201).json(response)
  } catch (e) {
    next(e)
  }*/
})

router.put('/', async function(req: Request, res: Response, next) {
  /*try {
    const response = await accessLevelController.updateAccessLevel(req.query)
    res.status(201).json(response)
  } catch (e: any) {
    next(e)
  }*/
})

export default router