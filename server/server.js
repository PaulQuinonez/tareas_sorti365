require('dotenv').config();
const http = require('http');
const app = require('./index')

const port = process.env.PORT

const server = http.createServer(app);
server.listen(process.env.PORT, function() {
    console.log("*******************************************");
    console.log("Servidor corriendo en el puerto: " + port);
    console.log("\nCONEXION CORRECTA");
    console.log("*******************************************");
});