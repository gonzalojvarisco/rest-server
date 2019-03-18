const express = require('express');
const app = express();

app.get('/usuario', function (req, res) {
    res.json('getUsuario local');
  });
  
  app.post('/usuario', (req, res)=>{
  
      let body = req.body;
  
      res.json({
          persona: body
      });
  });
  
  app.put('/usuario/:id', (req, res)=>{
      let id = req.params.id;
  
      res.json({id});
  });
  
  app.delete('/usuario', (req, res)=>{
      res.json('deleteUsuario');
  });

  module.exports = app;