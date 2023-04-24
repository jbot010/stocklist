import mongoose from "mongoose"

const Schema = mongoose.Schema

const colorSchema = new Schema({
  name: {type: String, required: true}
}, {
  timestamps: true
})

const Color = mongoose.model('Color', colorSchema)

export {
  Color
}