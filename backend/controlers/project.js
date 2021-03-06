'use strict'
var projectSave = require('../modelo/project');
const { param } = require('../routes/project');
var fs = require('fs');
var pathServer = require('path');
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
    },
    updateProject:(req, res)=>{
        var projectId = req.params.id;
        var update = req.body;

        projectSave.findByIdAndUpdate(projectId, update, {new:true}, (err,projectUpdate)=>{
            if(err) return res.status(500).send({message:'Error al actualizar datos'})
            if(!projectUpdate) return res.status(404).send({message:'El documento no existe'})
            return res.status(200).send({
                project:projectUpdate
            })
        })
    },
    deleteProject:(req, res)=>{
        var projectId = req.params.id;
        projectSave.findByIdAndDelete(projectId, (err,projectDelete)=>{
            if(err) return res.status(500).send({message:'Error al borrar datos'})
            if(!projectDelete) return res.status(404).send({message:'El documento no existe'})
            return res.status(200).send({
                project:projectDelete
            })
        })
    },
    uploadImage:(req,res)=>{
        var projectId= req.params.id;
        var fileName="Image not found";
        if(req.files){
            var fileName = req.files.image.path.split('\\')[2];
            var extFile = fileName.split('.')[1];
            if(extFile=='png' || extFile=='jpg'|| extFile=='jpeg'|| extFile=='gif'){
                projectSave.findByIdAndUpdate(projectId,{img:fileName},{new:true},(err,projectUpdate)=>{
                    if(err) return res.status(500).send({message:'Error al actualizar la imagen'})
                    if(!projectUpdate) return res.status(404).send({message:'El documento no existe'})
                    return res.status(200).send({
                        files:fileName
                    })
                })
            }else{
                fs.unlink(req.files.image.path,(err,removeFile)=>{
                    if(err) return res.status(500).send({message:'Error al borra la imagen'})
                    if(!removeFile) return res.status(404).send({message:'La extension no es la correcta'})
                })
            }
        }else{
            res.status(200).send({
                message:fileName
            })
        }
    },
    getImageFile:(req,res)=>{
        var file = req.params.image;
        var path= 'backend/uploads/'+file;
        if(fs.existsSync(path) == true){
            return res.sendFile(pathServer.resolve(path))
        }else{
            return res.status(200).send({
                message:'No existe la img'
            })
        }
    }
    
    
};
module.exports = controller;