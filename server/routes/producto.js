const express = require('express');

let Producto = require('../models/producto');

let app = express();

//===========================
//Obtiene producto
//===========================

app.get('/producto', (req, res)=>{

});

//===========================
//Obtiene producto por id
//===========================

app.get('/producto/:id', (req, res)=>{
    let id = req.params.id;
});

//===========================
//Crear nuevo producto
//===========================

app.post('/producto', (req, res)=>{

    //grabar usuario y la categoria

    let body = req.body;

    //let idCategoria = Categoria.findOne({descripcion:body.descripcion}, (err, ))

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.id_categoria,  //ver
        usuario: body.id_usuario       //ver
    });

    producto.save((err, productoDB)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!productoDB){
            return res.status(400).json({
                ok:false,
                message:'No se guardo correctamente'
            });
        }

        res.json({
            ok:true,
            producto: productoDB
        });

    })

});

//===========================
//Modificar producto
//===========================

app.put('/producto/:id', (req, res)=>{

});

//===========================
//Borrar producto
//===========================

app.delete('/producto/:id', (req, res)=>{

});

module.exports = app;