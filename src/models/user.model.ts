import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      default: '',
      required: false
    },
    image: {
      type: String,
      default: '',
      required: false
    }
  },
  {
    timestamps: true
  }
)

const userModel = mongoose.model('user', userSchema)

export default userModel
