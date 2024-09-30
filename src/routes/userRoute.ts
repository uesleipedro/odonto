import { NextFunction, Request, Response, Router } from 'express';
import { UserController } from '../controllers/userController';

const userController = new UserController();
const router = Router();

router.get('/', async function(req: Request, res: Response, next) {
  try {
    const response = await userController.getUsers();
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

router.get('/:email', async function(req: Request, res: Response, next) {
  try {
    const response = await userController.getUserByEmail(String(req.params.email));
    res.json(response);
  } catch (e) {
    next(e);
  }
});

router.get('/empresa/:id_empresa', async function(req: Request, res: Response, next) {
  try {
    const response = await userController.getUserByEmpresa(Number(req.params.id_empresa));
    res.json(response);
  } catch (e) {
    next(e)
  }
})

router.get('/empresa2/:id_empresa', async function(req: Request, res: Response, next) {
  try {
    const response = await userController.getUserByEmpresa2(Number(req.params.id_empresa));
    res.json(response);
  } catch (e) {
    next(e)
  }
})

router.post('/checkToken', async function(req: Request, res: Response, next) {
  try {
    const response = await userController.checkToken(req, res)
    res.json(response)
  } catch (e) {
    next(e)
  }
})

router.post('/', async function(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await userController.saveUser(req.body, next)
    res.status(201).json(response)
  } catch (e: any) {
    next(e)
  }
})

router.post('/login', async function(req: Request, res: Response, next) {
  res.status(999).json(req.body)
  return
  const response = await userController.login(req.body)
  response.error
    ? res.status(404).json(response)
    : res.status(201).json(response)
});

router.post('/loginOne', async function(req: Request, res: Response, next) {
  try {
    const response = await userController.loginOne(req, res);
    res.status(201).json(response);
  } catch (e: any) {
    next(e);
  }
})

router.post('/recuperarSenha', async function(req: Request, res: Response, next) {
  try {
    const response = await userController.recuperarSenha(req, res);
    res.status(201).json(response);
  } catch (e: any) {
    next(e);
  }
})

router.put('/', async function(req: Request, res: Response) {
  try {
    const response = await userController.updateUser(req.query)
    res.status(201).json(response)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
})

router.put('/redefinirSenha', async function(req: Request, res: Response, next) {
  try {
    const response = await userController.updatePassword(req, res);
    res.status(201).json(response)
  } catch (e: any) {
    next(e);
  }
})

router.delete('/:id_user/:id_empresa', async (req: Request, res: Response) => {
  const response = await userController.deleteUser(Number(req.params.id_user), Number(req.params.id_empresa))
  res.status(204).json(response)
})


export default router;
