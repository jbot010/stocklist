import { Brand } from "../models/brand.js";

function newBrand(req, res) {
  console.log("NEW BRAND VIEW!")
  Brand.find({})
  .then(brands => {
    res.render('brands/new', {
      title: 'Add Brand',
      brands: brands,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/clothingitems")
  })
}

function create(req, res) {
  console.log("CREATE NEW BRAND")
  console.log(req.body)
  Brand.create(req.body)
  .then(brand => {
    res.redirect('/brands/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/clothingitems")
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