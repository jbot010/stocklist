import mongoose from 'mongoose'

const Schema = mongoose.Schema

const clothingItemSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  name: {
    type: String,
    enum: ['Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories']
  },
  favorite: Boolean,
  sold: Boolean,
  status: {
    type: String,
    enum: ['Keep', 'Sell', 'Donate']
  },
  brands: [{type: Schema.Types.ObjectId, ref: 'Brand'}],
  colors: [{type: Schema.Types.ObjectId, ref: 'Color'}]
}, {
  timestamps: true,
})

const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema)

export {
  ClothingItem
}
