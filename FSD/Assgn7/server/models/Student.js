const { default: mongoose } = require('mongoose')
const mongoos = require('mongoose')

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
})

module.exports = mongoose.model('Student', studentSchema);
