'use strict'
var projectSave = require('../modelo/project');
const { param } = require('../routes/project');
var controller={
    home: (req, res)=>{
        return res.status(200).send(
            "¡Welcome Grace of God!"
        )
    },
    test: (req, res)=>{
        return res.status(200).send(
            "Route Test"
        )
    },
    saveProject: (req, res)=>{
      var projectNew = new projectSave();
      var params = req.body;
      projectNew.name = params.name;
      projectNew.description = params.description;
      projectNew.year = params.year;
      projectNew.category = params.category;
      projectNew.langs = params.langs;
      projectNew.img = params.img;
      projectNew.save((err,projectSaved)=>{
        if(err) return res.status(500).send('Error');
        if(!projectSaved) return res.status(404).send('No existe');
        return res.status(200).send({project:projectSaved});
      })
    },
    getProject:(req, res)=>{
        var projectId = req.params.id;
        if(projectId==null) return res.status(404).send({message:'El proyecto no existe'})
        projectSave.findById(projectId,(err,project)=>{
            if(err) return res.status(500).send({message:'Error al devolver datos'})
            if(!project) return res.status(404).send({message:'El proyecto no existe'})
            return res.status(200).send({
                project
            })
        })
    },
    getProjects:(req, res)=>{
        projectSave.find({}).sort('name').exec((err,projects)=>{
            if(err) return res.status(500).send({message:'Error al devolver datos'})
            if(!projects) return res.status(404).send({message:'El proyecto no existe'})
            return res.status(200).send({
                projects
            })
        })
    }
    
};
module.exports = controller;