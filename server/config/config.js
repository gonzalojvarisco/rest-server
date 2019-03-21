
process.env.PORT = process.env.PORT || 3000;  //puerto


//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = 'mongodb+srv://gonzalo:sXk2oF7A3sdh9OLD@cluster0-uxv2k.mongodb.net/cafe'; 
    
}

process.env.urlDB = urlDB;