const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const peliculaSchema = new Schema({
    nombre: String,
    rating: Number
})

const Pelicula = mongoose.model('Peliculas', peliculaSchema);

module.exports = Pelicula;