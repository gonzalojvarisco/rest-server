//========================================
//puerto
//========================================
process.env.PORT = process.env.PORT || 3000;



//========================================
//entorno
//========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI; //MONGO_URI variable definida en heroku

}

//========================================
//caducidad
//========================================
//60 segundos, 60 minutos, 24 horas, 30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//========================================
//seed de desarrollo
//========================================

process.env.SEED = 'seed-de-desarrollo';



process.env.urlDB = urlDB;