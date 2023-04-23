import { ClothingItem } from '../models/clothingitem.js'

function index(req, res) {
  console.log("ALL CLOTHING ITEMS")
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

function create(req, res) {
  console.log("CREATE ITEM")
  req.body.owner = req.user.profile._id
  req.body.favorite = !!req.body.favorite
  console.log(req.body.favorite)
  ClothingItem.create(req.body)  
  .then(clothingItem => {
    res.redirect('/clothingitems')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function show(req, res) {
  console.log("SHOW ITEM VIEW")
  ClothingItem.findById(req.params.clothingItemId)
  .then(clothingItem => {
    res.render('clothingitems/show', {
      title: 'Item Detail',
      clothingItem: clothingItem,
      
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  index,
  newClothingItem as new,
  create,
  show,
}