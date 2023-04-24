import { Router } from 'express'
import * as colorsCtrl from '../controllers/colors.js'
import { isLoggedIn } from '../middleware/middleware.js'


const router = Router()


export {
  router
}