const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Pelicula = require('./models/pelicula'),
    Actor = require('./models/actor'),
    Pais = require('./models/pais'),
    app = express();


const port = 3000,
    user = '',
    password = '',
    dbname = 'cine',
    uri = `mongodb+srv://${user}:${password}@aflc.pq4ov.mongodb.net/${dbname}?retryWrites=true&w=majority`


mongoose.connect(uri)
    .then(() => {
        console.log(`Conectado a la base de datos: ${dbname}`);
    })
    .catch(err => {
        console.log(`Error al conectarse a la base de datos: ${dbname}`);
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(`${__dirname}/public`))


app.post('/add', (req, res) => {
    const pelicula = new Pelicula({
        nombre: req.body.pelicula,
        rating: 10
    })

    pelicula.save()
        .then(doc => {
            // console.log('Dato guardado con exitos...');
            res.send({ response: 'Dato guardado con éxito...' })
        })
        .catch(err => console.log(err))
})


app.get('/peliculas', async(req, res) => {
    try {

        const arrayPeliculas = await Pelicula.find({}, 'nombre rating');

        res.send(arrayPeliculas);

    } catch (error) {
        console.log(error);
    }
})

app.get('/pelicula/:id/:nombre', async(req, res) => {
    const id = req.params.id,
        nombre = req.params.nombre;

    Pelicula.findByIdAndUpdate({ _id: id }, { $set: { nombre: nombre } })
        .then(doc => {
            res.send({ response: 'success' })
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/delete-pelicula/:id', async(req, res) => {
    const id = req.params.id;

    Pelicula.findByIdAndDelete({ _id: id })
        .then(doc => {
            res.send({ response: 'success' })
        })
        .catch(err => {
            console.log(err);
        })
})


app.get('/get-pelicula/:nombre', async(req, res) => {
    const nombre = req.params.nombre;

    Pelicula.find({ nombre: nombre }, 'nombre rating')
        .then(doc => {
            res.send(doc)
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/actores', async(req, res) => {
    try {

        const arrayActores = await Actor.find();
        // console.log(arrayActores);
        res.send(arrayActores);

    } catch (error) {
        console.log(error);
    }
})

app.get('/paises', async(req, res) => {
    try {

        const arrayPaises = await Pais.find();
        console.log(arrayPaises);
        res.send(arrayPaises);

    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Servidor iniciado...`);
})