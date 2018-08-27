
module.exports = function(app) {
        app.get('/produtos', function(req,res){
            //res.send("<html><body><h1>Listando os produtos</h1></body></html>");
            var mysql = require('mysql');
            var connection = app.infra.connectionFactory();
            var produtosDAO = new app.infra.ProdutosDAO(connection);

            produtosDAO.lista(function(err, results){

                if(err){
                    console.log(err);
                }else{
                    res.render('produtos/lista', {lista: results});
                    //res.send(results);
                }
            });

            connection.end();
           
        });

        app.get('/produtos/form',function(req,res){
            res.render('produtos/form');
        });


        app.post('/produtos/salva',function(req,res){

            var produto = req.body;
        
            var connection = app.infra.connectionFactory();
            var produtosDAO = new app.infra.ProdutosDAO(connection);
            produtosDAO.salva(produto, function(erros,resultados){
                res.render('produtos/lista');
            });
        });
}

// res.send(results);