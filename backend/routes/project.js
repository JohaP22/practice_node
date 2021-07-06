'use strict'
var express = require('express')
var ProjectController = require('../controlers/project')
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart({uploadDir:'./backend/uploads'})
var router = express.Router();
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save', ProjectController.saveProject);
router.get('/getProject/:id?', ProjectController.getProject);
router.get('/getProjects', ProjectController.getProjects);
router.put('/updateProject/:id', ProjectController.updateProject);
router.delete('/deleteProject/:id', ProjectController.deleteProject);
router.post('/uploadImage/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/getImage/:image', ProjectController.getImageFile);

module.exports = router;
