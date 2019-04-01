const express = require('express');
let {verificaToken} = require('../middlewares/autenticacion');

const app = express();

const Categoria = require('../models/categoria');


//===============================
//Mostrar categorias
//===============================

app.get('/categoria', (req, res)=>{

});

//===============================
//Mostrar categorias
//===============================

app.get('/categoria/:id',(req, res)=>{

});

//===============================
//Crear nueva categoria
//===============================

app.post('/categoria', verificaToken, (req, res)=>{
   
    

});

//===============================
//Actualizar categoria
//===============================

app.put('/categoria/:id', (req, res)=>{

});

//===============================
//Borrar categorias
//===============================

app.delete('/categoria/:id', (req, res)=>{
//solo un admin puede borrar una categoria
});


module.exports = {
    app
}