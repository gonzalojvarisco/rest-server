const express = require('express');

let Producto = require('../models/producto');

let {verificaToken} = require('../middlewares/autenticacion');

let app = express();

//===========================
//Obtiene producto
//===========================

app.get('/producto', verificaToken,(req, res)=>{

    let desde = req.query.desde || 0;    //ver
    desde = Number(desde);

    let limite = req.query.limite || 0;  //ver
    limite = Number(limite);

    Producto.find({ disponible:true })
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
            
        res.json({
            ok:true,
            producto: productos
        });

    })

});

//===========================
//Obtiene producto por id
//===========================

app.get('/producto/:id', verificaToken,(req, res)=>{
    
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB)=>{

            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }

            if(!productoDB){
                return res.status(400).json({
                    ok:false,
                    message:'El ID no existe'
                });
            }

            res.json({
                ok:true,
                producto:productoDB
            });

        })

});


//===========================
//Obtiene producto por id
//===========================

app.get('/producto/buscar/:termino', verificaToken, (req, res)=>{

    let termino = req.params.termino;
    let regexp = new RegExp(termino, 'i');

    Producto.find({nombre: regexp})
        .populate('categoria', 'descripcion')
        .exec((err, productoDB)=>{

            if(err){
                res.status(400).json({
                    ok:false,
                    err
                });
            }

            res.json({
                ok:true,
                producto:productoDB
            });

        });

})




//===========================
//Crear nuevo producto
//===========================

app.post('/producto', verificaToken, (req, res)=>{

    //grabar usuario y la categoria

    let body = req.body;

    //let idCategoria = Categoria.findOne({descripcion:body.descripcion}, (err, ))

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
        
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

        res.status(201).json({
            ok:true,
            producto: productoDB
        });

    })

});

//===========================
//Modificar producto
//===========================

app.put('/producto/:id',verificaToken, (req, res)=>{

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
                message:'no existe'
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

app.delete('/producto/:id', verificaToken,(req, res)=>{

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
                message:'El id no existe'
            });
        }

        res.json({
            ok:true,
            producto:productoModif
        });

    })

});

module.exports = app;