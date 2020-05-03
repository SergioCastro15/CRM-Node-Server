const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// cors permite que un cliente se conecte a otro servidor para el intercambio de informacion
const cors = require('cors');

// conectar a la DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// crear el servidor
const app = express();

// habilitar el bodyparser para respuestas json funciona con req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// habilitar cors
app.use(cors());


// rutas de la app
app.use('/', routes());

// carpeta publica para las imagenes
app.use(express.static('uploads'));

// puerto donde funcionara
app.listen(5000);