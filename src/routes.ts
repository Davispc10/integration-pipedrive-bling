import { Router } from 'express'

import DealController from './controllers/DealController'

const routes = Router()

routes.get('/deals', DealController.index)

export default routes
