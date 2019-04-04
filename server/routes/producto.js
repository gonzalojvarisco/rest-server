const express = require('express');

let Producto = require('../models/producto');

let app = express();

//===========================
//Obtiene producto
//===========================

app.get('/producto', (req, res)=>{

    let desde = req.query.desde || 0;    //ver
    desde = Number(desde);

    let limite = req.query.limite || 0;  //ver
    limite = Number(limite);

    Producto.find({})
    .sort('nombre')
    .populate('categoria', 'descripcion')
    .populate('usuario', 'nombre email')
    .skip(desde)
    .limit(limite)
    .exec((err, productos)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!productos){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            producto: productos
        });

    })

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
                err
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

    let id = req.params.id;
    let body = req.body;

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true} , (err, productoDB)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            producto:productoDB
        });

    })

});

//===========================
//Borrar producto
//===========================

app.delete('/producto/:id', (req, res)=>{

    let id = req.params.id;
    let body = req.body;

    Producto.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, productoModif)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!productoModif){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            producto:productoModif
        });

    })

});

module.exports = app;