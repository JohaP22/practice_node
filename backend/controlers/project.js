'use strict'
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
    }
};
module.exports = controller;