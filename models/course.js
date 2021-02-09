const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = Schema({
  name: {
    type: String,
    required: true
},
  type: {
  type: String,
  required: true
},
subjects: [
  {type: Array}
]
});

module.exports = mongoose.model('courses', CourseSchema);