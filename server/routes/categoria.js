const express = require('express');
let {verificaToken, verificaAdmin_Role} = require('../middlewares/autenticacion');

const app = express();

const Categoria = require('../models/categoria');


//===============================
//Mostrar categorias
//===============================

app.get('/categoria', (req, res)=>{

    Categoria.find({}, (err, categoriaDB)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            categorias:categoriaDB
        });

    })

});

//===============================
//Mostrar categorias
//===============================

app.get('/categoria/:id',(req, res)=>{
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            categoria:categoriaDB
        });

    })

});

//===============================
//Crear nueva categoria
//===============================

app.post('/categoria', verificaToken, (req, res)=>{
   
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB)=>{
        
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            categoria:categoriaDB
        });

    });

});

//===============================
//Actualizar categoria
//===============================

app.put('/categoria/:id', verificaToken, (req, res)=>{

    let id = req.params.id;
    let body = req.body;

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            categoria: categoriaDB
        });
    })


});

//===============================
//Borrar categorias
//===============================

app.delete('/categoria/:id',[verificaToken, verificaAdmin_Role], (req, res)=>{

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDBBorrada)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!categoriaDBBorrada){
            return res.status(400).json({
                ok:false,
                message:'El id no existe'
            });
        }


        res.json({
            ok:true,
            message:'Categoria borrada'
        });

    })

    
});


module.exports = app;