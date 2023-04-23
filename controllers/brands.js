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

export {
  newBrand as new,
  create,
}