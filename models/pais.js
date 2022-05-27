const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const paisSchema = new Schema({
    pais: String
})

const Pais = mongoose.model('Paises', paisSchema);

module.exports = Pais;