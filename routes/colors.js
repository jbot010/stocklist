import { Router } from 'express'
import * as colorsCtrl from '../controllers/colors.js'
import { isLoggedIn } from '../middleware/middleware.js'


const router = Router()

// GET localhost:3000/colors/new
router.get('/new', isLoggedIn, colorsCtrl.new)

// POST localhost:3000/colors
router.post('/', isLoggedIn, colorsCtrl.create)

// DELETE localhost:3000/colors/:colorId
router.delete('/:colorId', isLoggedIn, colorsCtrl.delete)

export {
  router
}