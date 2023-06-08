const express = require('express');
const connection = require('./src/config/database')
var cors = require('cors');
const usuarioRoute = require('./src/routes/usuario')
const tareaRoute = require('./src/routes/tarea')
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/sorti365/usuario', usuarioRoute)
app.use('/api/sorti365/tarea', tareaRoute)

module.exports = app;