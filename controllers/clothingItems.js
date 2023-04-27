import { ClothingItem } from '../models/clothingItem.js'
import { Brand } from '../models/brand.js'
import { Color } from '../models/color.js'

function index(req, res) {
  ClothingItem.find({})
  .populate([
    {path: 'colors'},
    {path: 'brands'}
  ])
  .then(clothingItems => {
    res.render('clothingItems/index', {
      title: "All Items",
      clothingItem: clothingItems,
      colors: ClothingItem.colors,
      brands: ClothingItem.brands, 
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function newClothingItem(req, res) {
  Brand.find()
  .then(brands => {
    Color.find()
    .then(colors => {
      res.render('clothingItems/new', {
        title: 'Add Item',
        brands: brands,
        colors: colors,
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.favorite = !!req.body.favorite
  ClothingItem.create(req.body)  
  .then(clothingItem => {
    if (clothingItem.owner.equals(req.user.profile._id)) {
      clothingItem.brands.push(req.body.brandId)
      clothingItem.colors.push(req.body.colorId)
      clothingItem.save()      
    }
    res.redirect('/clothingItems')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function show(req, res) {
  ClothingItem.findById(req.params.clothingItemId)
  .populate([
    {path: 'colors'},
    {path: 'brands'}
  ])
  .then(clothingItem => {
    res.render('clothingItems/show', {
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
  ClothingItem.findByIdAndDelete(req.params.clothingItemId)
  .then(clothingItem => {
    res.redirect('/clothingItems')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function edit(req, res) {
  ClothingItem.findById(req.params.clothingItemId)
  .populate([
    {path: 'colors'},
    {path: 'brands'}
  ])  
  .then(clothingItem => {
    Color.find({_id: {$nin: clothingItem.colors}})
    .then(colors => {
      Brand.find({_id: {$nin: clothingItem.brands}})
      .then(brands => {
        res.render('clothingItems/edit', {
          title: "Edit Item",
          clothingItem: clothingItem,
          colors: colors,
          brands: brands,
        })
      })
      .catch(err => {
        console.log(err)
        res.redirect("/clothingItems")
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/clothingItems")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/clothingItems")
  })
}

function update(req, res) {
  req.body.favorite = !!req.body.favorite
  req.body.sold = !!req.body.sold
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  ClothingItem.findByIdAndUpdate(req.params.clothingItemId, req.body, {new: true})
  .then(clothingItem => {
    clothingItem.brands = [req.body.brandId]
    clothingItem.colors = [req.body.colorId]
    clothingItem.save()
    res.redirect(`/clothingItems/${clothingItem._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/clothingItems')
  })
}

function addToBrand(req, res) {
  ClothingItem.findById(req.params.clothingItemId)
  .then(clothingItem => {
    clothingItem.brands.push(req.body.brandId)
    clothingItem.save()
    .then(() => {
      res.redirect(`/clothingItems/${clothingItem._id}`)      
    })
    .catch(err => {
      console.log(err)
      res.redirect('/clothingItems')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/clothingItems')
  })
}

function addToColor(req, res) {
  ClothingItem.findById(req.params.clothingItemId)
  .then(clothingItem => {
    clothingItem.colors.push(req.body.colorId)
    clothingItem.save()
    .then(() => {
      res.redirect(`/clothingItems/${clothingItem._id}`)      
    })
    .catch(err => {
      console.log(err)
      res.redirect('/clothingItems')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/clothingItems')
  })
}

function updateBrand(req, res) {
  ClothingItem.findById(req.params.clothingItemId)
  .then(clothingItem => {
    clothingItem.brands.push(req.body.brandId)
    clothingItem.save()
    .then(() => {
      res.redirect(`/clothingItems/${clothingItem._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/clothingItems')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/clothingItems')
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