const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  role: {
    type: String,
    default: 'admin',
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Admin key password is required'],
    select: false
  }
}, {
  timestamps: true
});

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.matchPassword = async function(enteredKey) {
  return await bcrypt.compare(enteredKey, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);

