
module.exports = function(app) {
        app.get('/produtos', function(req,res){
            //res.send("<html><body><h1>Listando os produtos</h1></body></html>");
            var mysql = require('mysql');
            var connection = app.infra.connectionFactory();
            var produtosBanco = new app.infra.ProdutosDAO(connection);

            produtosBanco.lista(function(err, results){

                if(err){
                    res.send(err);
                }else{
                    res.render('produtos/lista', {lista: results});
                    //res.send(results);
                }
            });

            connection.end();
           
        });
}

// res.send(results);