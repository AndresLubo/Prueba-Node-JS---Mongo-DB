const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const actorSchema = new Schema({
    name: String,
    lastname: String
})

const Actor = mongoose.model('Actores', actorSchema);

module.exports = Actor;