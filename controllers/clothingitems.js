import { ClothingItem } from '../models/clothingItem.js'
import { Brand } from '../models/brand.js'

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
    res.redirect(`/clothingitems/${clothingItem._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function show(req, res) {
  console.log("SHOW ITEM VIEW")
  ClothingItem.findById(req.params.clothingItemId)
  .populate('brands')
  .then(clothingItem => {
    Brand.find({_id: {$nin: clothingItem.brands}})
    .then(brands => {
      res.render('clothingitems/show', {
        title: 'Item Detail',
        clothingItem: clothingItem,
        brands: brands,
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function deleteClothingItem(req, res) {
  console.log("DELETE ITEM")
  ClothingItem.findByIdAndDelete(req.params.clothingItemId)
  .then(clothingItem => {
    res.redirect('/clothingitems')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function edit(req, res) {
  console.log("EDIT ITEM")
  ClothingItem.findById(req.params.clothingItemId)
  .then(clothingItem => {
    res.render('clothingitems/edit', {
      clothingItem: clothingItem,
      title: "Edit Item"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/clothingitems')
  })
}

function update(req, res) {
  console.log("UPDATE ITEM!")
  req.body.favorite = !!req.body.favorite
  req.body.sold = !!req.body.sold
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  ClothingItem.findByIdAndUpdate(req.params.clothingItemId, req.body, {new: true})
  .then(clothingItem => {
    res.redirect(`/clothingitems/${clothingItem._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/clothingitems')
  })
}

function addToBrand(req, res) {
  console.log("ADD BRAND!")
  ClothingItem.findById(req.params.clothingItemId)
  .then(clothingItem => {
    clothingItem.brands.push(req.body.brandId)
    clothingItem.save()
    .then(() => {
      res.redirect(`/clothingitems/${clothingItem._id}`)      
    })
    .catch(err => {
      console.log(err)
      res.redirect('/clothingitems')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/clothingitems')
  })
}


export {
  index,
  newClothingItem as new,
  create,
  show,
  deleteClothingItem as delete,
  edit,
  update,
  addToBrand,
}