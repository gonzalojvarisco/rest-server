const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario');
const fs = require('fs');
const path = require('path');

app.use( fileUpload({ useTempFiles: true }) );


app.put('/upload/:tipo/:id', function(req, res) {

  let tipo = req.params.tipo;
  let id = req.params.id;

  if(!req.files){
        return res.status(400).json({
            ok:false,
            err:{
                message:'no se ha seleccionado ningun archivo'
            }
        });
  }

  //validacion tipo
  let tiposValidos = ['usuarios','productos'];

  if(tiposValidos.indexOf(tipo) < 0){
    return res.status(400).json({
      ok:false,
      err:{
        message:'El tipo no es valido. Los tipos permitidos son '+ tiposValidos.join(', ')
      },
      Ingreso: tipo
    })
  }


  let archivo = req.files.archivo;
  let nombreCortado = archivo.name.split('.');
  let extension = nombreCortado[nombreCortado.length-1];

  //extensiones permitidas
  let extensionesValidas = ['PNG', 'jpg', 'gif', 'jpeg'];

  if(extensionesValidas.indexOf(extension) < 0){
    return res.status(400).json({
      ok:false,
      err:{
        message:'Las extensiones permitidas son:'+ extensionesValidas.join(', '),
        ext: extension
      }
    })
  }

  //cambiar el nombre al archivo
  let nombreArchivo= `${id}-${new Date().getMilliseconds()}.${extension}`;

  archivo.mv(`uploads/${tipo}/${nombreArchivo}`, function(err) {
    if (err)
      return res.status(500).json({
          ok:false,
          err
      });

    imagenUsuario(id, res, nombreArchivo);

    
  });

});

function imagenUsuario(id, res, nombreArchivo){
Usuario.findById(id, (err, usuarioDB)=>{
  if(err){

    borrarArchivo(nombreArchivo, 'usuarios');

    return res.status(500).json({
      ok:false,
      err
    });
  }
  if(!usuarioDB){

    borrarArchivo(nombreArchivo, 'usuarios');

    return res.status(400).json({
      ok:false,
      err:{
        message:'Usuario no existe'
      }
    });
  }

  borrarArchivo(usuarioDB.img, 'usuarios');

  usuarioDB.img = nombreArchivo;
  usuarioDB.save((err, usuarioGuardado)=>{

    res.json({
      ok:true,
      usuario: usuarioGuardado,
      img: nombreArchivo
    });

  })

})
}

function imagenProducto(){}

function borrarArchivo(nombreImagen, tipo){

  let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
  if(fs.existsSync(pathImagen)){
    fs.unlinkSync(pathImagen);
  }

}

module.exports = app;