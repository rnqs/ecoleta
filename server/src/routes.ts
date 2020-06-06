import express from 'express'
import multer from 'multer'
import multerConfig from './configs/multer'

import * as itemController from './controllers/itemController'
import * as pointController from './controllers/pointController'

const routes = express.Router()
const upload = multer(multerConfig)

routes.get('/', (req, res) => res.send('Ecoleta server is listening'))

routes.get('/items', itemController.index)

routes.get('/point', pointController.index)
routes.get('/point/:id', pointController.show)
routes.post('/point', upload.single('image'), pointController.create)

export default routes
