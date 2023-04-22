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

export {
  index
}