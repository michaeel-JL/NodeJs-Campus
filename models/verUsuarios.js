const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const verSchema = Schema({
    usuario: {
        type: String,
        default:"usuario",
    },

    rol: {
        type: String,
        default:"rol",

    },

    asignaturas:{
        type: String,
        default:"asignaturas",

    },
    usuario: [
        {type: mongoose.Schema.Types.ObjectId, ref:'user'}
    ]

})


module.exports = mongoose.model('verUsuarios', verSchema);