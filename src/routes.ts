import { Router } from 'express'

import UserController from './controllers/UserController'
import ConverterController from './controllers/ConverterController'


const userController = new UserController()
const converterController = new ConverterController()


const routes = Router()

routes.post('/users', userController.create)

routes.post('/conversions', converterController.create)
routes.get('/conversions/:id', converterController.index)


export default routes