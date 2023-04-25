import { Color } from "../models/color.js"

function newColor(req, res) {
  console.log("NEW COLOR VIEW!")
  Color.find({})
  .then(colors => {
    res.render('colors/new', {
      title: 'Add Color',
      colors: colors,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/clothingItems")
  })
}

function create(req, res) {
  console.log("CREATE NEW COLOR")
  console.log(req.body)
  Color.create(req.body)
  .then(color => {
    res.redirect('/colors/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/clothingItems")
  })
}

function deleteColor(req, res) {
  Color.findByIdAndDelete(req.params.colorId)
  .then(color => {
    res.redirect('/colors/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/colors/new")
  })
}

export {
  newColor as new,
  create,
  deleteColor as delete,
}