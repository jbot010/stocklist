import { Brand } from "../models/brand.js"

function newBrand(req, res) {
  Brand.find({})
  .then(brands => {
    res.render('brands/new', {
      title: 'Add Brand',
      brands: brands,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/clothingItems")
  })
}

function create(req, res) {
  Brand.create(req.body)
  .then(brand => {
    res.redirect('/brands/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/clothingItems")
  })
}

function deleteBrand(req, res) {
  Brand.findByIdAndDelete(req.params.brandId)
  .then(brand => {
    res.redirect('/brands/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/brands/new")
  })
}

export {
  newBrand as new,
  create,
  deleteBrand as delete,
}