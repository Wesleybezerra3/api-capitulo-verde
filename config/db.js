const Sequelize = require('sequelize');
const database = new Sequelize('capitulo_verde', 'root', 'Wes1018m.',{
    dialect:'mysql',
    host:'localhost'
})
try{
    database.authenticate()
    console.log('Banco de dados conectado!')
}catch(err){
    console.log('Errro ao conectar no banco de dados!!', err)
}


module.exports = database;
