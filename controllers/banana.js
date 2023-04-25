import { ClothingItem } from '../models/clothingItem.js'
import { Brand } from '../models/brand.js'
import { Color } from '../models/color.js'

function index(req, res) {
  console.log("ALL CLOTHING ITEMS")
  ClothingItem.find({})
  .then(clothingItems => {
    res.render('clothingitems/index', {
      clothingItems,
      title: "All Items",
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function newClothingItem(req, res) {
  console.log("NEW ITEM VIEW");
  Brand.find()
  .then(brands => {
    Color.find()
    .then(colors => {
      res.render('clothingitems/new', {
        title: 'Add Item',
        brands: brands,
        colors: colors,
      })
    })
  })
}

function create(req, res) {
  console.log("CREATE ITEM")
  req.body.owner = req.user.profile._id
  req.body.favorite = !!req.body.favorite
  ClothingItem.create(req.body)  
  .then(clothingItem => {
    clothingItem.brands.push(req.body.brandId)
    clothingItem.colors.push(req.body.colorId)
    clothingItem.save() 
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
  .populate([
    {path: 'colors'},
    {path: 'brands'}
  ])
    .then(clothingItem => {
        console.log(clothingItem.colors, clothingItem.brands, "SHOW ME THE COLORS")
        res.render('clothingitems/show', {
          title: 'Item Detail',
          clothingItem: clothingItem,
          colors: clothingItem.colors,
          brands: clothingItem.brands,          
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

function addToColor(req, res) {
  console.log('ADD COLOR!!')
  ClothingItem.findById(req.params.clothingItemId)
  .then(clothingItem => {
    clothingItem.colors.push(req.body.colorId)
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

function updateBrand(req, res) {
  console.log('UPDATE BRAND!')
  ClothingItem.findById(req.params.clothingItemId)
  .then(clothingItem => {
    console.log(req.body.brandId)
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
  addToColor,
  updateBrand,
}