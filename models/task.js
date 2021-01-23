const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  title: {
    type: String,
    required: true
},

  description: {
    type: String,
    required: true
},
  status: {
    type: Boolean,
    default: false
  },
  usuario: [
    {type: mongoose.Schema.Types.ObjectId, ref:'user'}
]
});

module.exports = mongoose.model('tasks', TaskSchema);
