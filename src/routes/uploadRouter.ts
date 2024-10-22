import { Router, Request, Response, NextFunction } from "express"
import path from "path"

const router = Router()

const imageDirectory = path.join(__dirname, '/../../../uploads/image/')

router.post('/image', async function(req: Request, res: Response, next: NextFunction) {
  const { image }: any = req.files
  const id_empresa = req.body.id_empresa
  const ext = path.extname(image.name)

  if (!image) return res.sendStatus(400)
  if (!/^image/.test(image.mimetype)) return res.sendStatus(400)

  image.mv(`${imageDirectory}${id_empresa}.jpg`)

  res.sendStatus(200)

})

router.get('/image/:filename', (req, res) => {
  const filename = req.params.filename
  const imagePath = path.join(imageDirectory, `${filename}.jpg`)

  res.sendFile(imagePath)
})

export default router
