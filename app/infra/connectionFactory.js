var mysql = require('mysql');

function createDBConnection(){
    return mysql.createConnection({
            host : 'localhost',
            user : 'solimar',
            password : '123456',
            database : 'casadocodigo'
          });

}

//quando o Express Load carrega os módulos, 
//automaticamente ele já invoca o objeto. 
//Não é interessante deixarmos isso acontecer na connectionFactory, 
//porque nesse caso ao iniciar a aplicação ele se conectará com o banco sem necessidade.
//Por isso é criada a function createDBConnection() fora do module.exports.
module.exports = function(){
    return createDBConnection;
}