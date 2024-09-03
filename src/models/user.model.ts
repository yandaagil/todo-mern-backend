import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      default: '',
      required: false
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const userModel = mongoose.model('user', userSchema)

export default userModel
