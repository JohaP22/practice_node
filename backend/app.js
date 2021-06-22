'use strict'

var express = require('express');
var bodyParse = require('body-parser')
var app = express();
var project_routes = require('./routes/project')

app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());
app.use('/api', project_routes)
module.exports = app;

