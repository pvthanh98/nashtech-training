import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName:  String,
  lastName:  String,
  birthday: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  address: {
    city: String,
    country: String,
    postcode: String,
    state: String
  },
  password: {
    type: String,
    select:false
  },
  email: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  socketId: String
});

const User = mongoose.model('user', userSchema);

export {
  User,
  userSchema
}