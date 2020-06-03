import express from 'express'

const routes = express.Router()

import * as itemController from './controllers/itemController'
import * as pointController from './controllers/pointController'

routes.get('/', (req, res) => {
  return res.send('Ecoleta server is listening')
})

routes.get('/items', itemController.index)

routes.get('/point', pointController.index)
routes.get('/point/:id', pointController.show)
routes.post('/point', pointController.create)

export default routes
