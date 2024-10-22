import { Router, Request, Response, NextFunction } from "express"

const router = Router()

router.post('/image', async function(req: Request, res: Response, next: NextFunction) {
  const { image }: any = req.files

  // If no image submitted, exit
  if (!image) return res.sendStatus(400)

  // Move the uploaded image to our upload folder
  image.mv(__dirname + '/../../../uploads/image/' + image.name)
  //console.log(__dirname + '/../..')
  res.sendStatus(200)

})

export default router
