import { Router } from 'express'
import * as brandsCtrl from '../controllers/brands.js'
import { isLoggedIn } from '../middleware/middleware.js'


const router = Router()

//GET localhost:3000/brands/new
router.get('/new', isLoggedIn, brandsCtrl.new)

// POST localhost:3000/brands
router.post('/', isLoggedIn, brandsCtrl.create)

export {
  router
}