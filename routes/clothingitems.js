import { Router } from 'express'
import * as clothingItemsCtrl from '../controllers/clothingitems.js'
import { isLoggedIn } from '../middleware/middleware.js'


const router = Router()

// ALL ROUTES in this file start with localhost:3000/clothingitems

// GET localhost:3000/clothingitems
router.get('/', isLoggedIn, clothingItemsCtrl.index)

// GET localhost:3000/clothingitems/new
router.get('/new', isLoggedIn, clothingItemsCtrl.new)

// POST localhost:3000/clothingitems
router.post('/', clothingItemsCtrl.create)

export {
  router
}