const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = Schema({
  title: {
    type: String,
    required: true
},

  description: {
    type: String,
    required: true
},
link: {
  type : String, required : true
},
  alumnos: [
    {type:Array}
  ],
  profesores: [
    {type: Array}
  ]
});

module.exports = mongoose.model('subjects', SubjectSchema);