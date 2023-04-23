import { Router } from 'express'
import * as clothingItemsCtrl from '../controllers/clothingItems.js'
import { isLoggedIn } from '../middleware/middleware.js'


const router = Router()

// ALL ROUTES in this file start with localhost:3000/clothingitems

// GET localhost:3000/clothingitems
router.get('/', isLoggedIn, clothingItemsCtrl.index)

// GET localhost:3000/clothingitems/new
router.get('/new', isLoggedIn, clothingItemsCtrl.new)

// GET localhost:3000/clothingitems/:clothingItemId
router.get('/:clothingItemId', isLoggedIn, clothingItemsCtrl.show)

// GET localhost:3000/clothingitems/:clothingItemId/edit
router.get('/:clothingItemId/edit', isLoggedIn, clothingItemsCtrl.edit)

// POST localhost:3000/clothingitems
router.post('/', isLoggedIn, clothingItemsCtrl.create)

// DELETE localhost:3000/clothingitems/:clothingItemId
router.delete('/:clothingItemId', isLoggedIn, clothingItemsCtrl.delete)

export {
  router
}