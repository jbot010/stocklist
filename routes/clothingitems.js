import { Router } from 'express'
import * as clothingItemsCtrl from '../controllers/clothingitems.js'
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

// PUT localhost:3000/clothingitems/:clothingItemId
router.put('/:clothingItemId', isLoggedIn, clothingItemsCtrl.update)

// POST localhost:3000/clothingitems
router.post('/', isLoggedIn, clothingItemsCtrl.create)

// POST localhost:3000/clothingitems/:clothingItemId/brands
router.post('/:clothingItemId/brands', isLoggedIn, clothingItemsCtrl.addToBrand)

// PATCH localhost:3000/clothingitems/:clothingItemId/updatebrands
router.patch('/clothingItemId/updatebrands', isLoggedIn, clothingItemsCtrl.updateBrand)

// DELETE localhost:3000/clothingitems/:clothingItemId
router.delete('/:clothingItemId', isLoggedIn, clothingItemsCtrl.delete)



export {
  router
}