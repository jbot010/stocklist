import { Color } from "../models/color.js"

function newColor(req, res) {
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