const mongoose = require('mongoose');

mongoose.connect(process.env.URI)
    .then(()=> console.log("Se ha conectado la aplicación a la Base de Datos correctamente"))
    .catch((b)=> console.log("No se ha podido establecer la conexión con la Base de Datos" + b))