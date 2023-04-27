import mongoose from 'mongoose'

const Schema = mongoose.Schema

const brandSchema = new Schema({
  name: {type: String, required: true}
}, {
  timestamps: true
})

const Brand = mongoose.model('Brand', brandSchema)

export {
  Brand
}