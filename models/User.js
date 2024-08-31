import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeID: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  password: { type: String, required: true },
  shift: { type: String, required: true }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
