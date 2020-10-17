const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  image: {
    type: String,
    default:
      'https://contacts-manager1981.s3.eu-west-3.amazonaws.com/default.png'
  },
  type: {
    type: String,
    default: 'personal'
  },
  date: {
    type: Date,
    default: Date.now
  }
});
contactSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Contact', contactSchema);
