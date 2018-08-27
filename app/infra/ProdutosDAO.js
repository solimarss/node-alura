//Cria uma "Classe"
function ProdutosDAO(connection){
    this._connection = connection;
}
//Adciona "metodos" na "classe"
ProdutosDAO.prototype.lista = function(callback){
    this._connection.query('select * from livros', callback);
}

module.exports = function(){
    return ProdutosDAO;
}