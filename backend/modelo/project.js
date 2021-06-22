'use strict'
var mongoose = require('mongoose');
var schema = mongoose.schema;

var projectSchema = Schema({
    name:String,
    description:String,
    category:String,
    langs:[String],
    year:Number
})
module.exports = mongoose.model('Projects',projectSchema)