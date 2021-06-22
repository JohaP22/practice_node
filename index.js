'use strict'
var mongoose = require('mongoose');
var app = require('./backend/app');
var port = 3700;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portfolio')
        .then(()=>{
                console.log('Gracias a DIOS, connect')
                app.listen(port, ()=>{
                        console.log('Servidor corriendo');
                });
        })
        .catch((err)=>console.log(err))