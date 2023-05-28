import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    trim: true,
  },
});

const UserModel = mongoose.models.user || mongoose.model('user', userSchema);

export default UserModel;
