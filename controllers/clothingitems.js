import { ClothingItem } from '../models/clothingitem.js'

function index(req, res) {
  console.log("CLOTHING ITEMS")
  ClothingItem.find({})
  .then(clothingItems => {
    res.render('clothingitems/index', {
      clothingItems,
      title: "All Items"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function newClothingItem(req, res) {
  console.log("NEW ITEM VIEW");
  res.render('clothingitems/new', {
    title: "Add Item"
  })
}

export {
  index,
  newClothingItem as new,
}