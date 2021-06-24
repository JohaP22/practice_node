'use strict'
var express = require('express')
var ProjectController = require('../controlers/project')

var router = express.Router();
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save', ProjectController.saveProject);
router.get('/getProject/:id?', ProjectController.getProject);
router.get('/getProjects', ProjectController.getProjects);

module.exports = router;
