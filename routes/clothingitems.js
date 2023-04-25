import { Router } from 'express'
import * as clothingItemsCtrl from '../controllers/clothingItems.js'
import { isLoggedIn } from '../middleware/middleware.js'


const router = Router()

// ALL ROUTES in this file start with localhost:3000/clothingItems

// GET localhost:3000/clothingItems
router.get('/', isLoggedIn, clothingItemsCtrl.index)

// GET localhost:3000/clothingItems/new
router.get('/new', isLoggedIn, clothingItemsCtrl.new)

// GET localhost:3000/clothingItems/:clothingItemId
router.get('/:clothingItemId', isLoggedIn, clothingItemsCtrl.show)

// GET localhost:3000/clothingItems/:clothingItemId/edit
router.get('/:clothingItemId/edit', isLoggedIn, clothingItemsCtrl.edit)

// PUT localhost:3000/clothingItems/:clothingItemId
router.put('/:clothingItemId', isLoggedIn, clothingItemsCtrl.update)

// POST localhost:3000/clothingItems
router.post('/', isLoggedIn, clothingItemsCtrl.create)

// POST localhost:3000/clothingItems/:clothingItemId/brands
router.post('/:clothingItemId/brands', isLoggedIn, clothingItemsCtrl.addToBrand)

// PATCH localhost:3000/clothingItems/:clothingItemId/updatebrands
router.patch('/clothingItemId/updatebrands', isLoggedIn, clothingItemsCtrl.updateBrand)

// DELETE localhost:3000/clothingItems/:clothingItemId
router.delete('/:clothingItemId', isLoggedIn, clothingItemsCtrl.delete)



export {
  router
}