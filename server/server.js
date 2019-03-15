const express = require('express')
const app = express();
let bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
 
app.get('/usuario', function (req, res) {
  res.json('getUsuario');
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
 
app.listen(3000, ()=>{
    console.log(`escuchando puerto`, 3000);
})