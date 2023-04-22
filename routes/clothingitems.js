import { Router } from 'express'
import * as clothingItemsCtrl from '../controllers/clothingitems.js'


const router = Router()

// ALL ROUTES in this file start with localhost:3000/clothingitems

// GET localhost:3000/clothingitems
router.get('/', clothingItemsCtrl.index)

export {
  router
}