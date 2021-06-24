'use strict'
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var projectSchema = schema({
    name:String,
    description:String,
    category:String,
    langs:String,
    year:Number,
    img: String
})
module.exports = mongoose.model('Projects',projectSchema)