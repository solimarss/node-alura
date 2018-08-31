
module.exports = function(app) {
        app.get('/produtos', function(req,res){
            //res.send("<html><body><h1>Listando os produtos</h1></body></html>");
            var mysql = require('mysql');
            var connection = app.infra.connectionFactory();
            var produtosDAO = new app.infra.ProdutosDAO(connection);

            produtosDAO.lista(function(err, resultados){

                if(err){
                    console.log(err);
                }else{
                    res.format({
                        html: function(){
                            res.render('produtos/lista',{lista:resultados});
                        },
                        json: function(){
                            res.json(resultados)
                        }
                    });
                }
            });

            connection.end();
           
        });

        app.get('/produtos/form',function(req,res){
            res.render('produtos/form',
                {errosValidacao: {}, produto: {}});
        });


        app.post('/produtos',function(req,res){

            var produto = req.body;

            //Validação com express-validator
            var validatorTitulo = req.assert('titulo','Titulo é obrigatório').notEmpty();
            req.assert('preco','Formato inválido').isFloat();
            var erros = req.validationErrors();

            if(erros){
                res.format({
                    html: function(){
                        //Status code 400 = bad request
                        res.status(400).render('produtos/form',{errosValidacao:erros,produto:produto});
                    },
                    json: function(){
                        res.status(400).json(erros);
                    }
                });
                return;
            }
        
            var connection = app.infra.connectionFactory();
            var produtosDAO = new app.infra.ProdutosDAO(connection);
            produtosDAO.salva(produto, function(erros,resultados){
                if(erros){
                    console.log(erros);
                }
                res.redirect('/produtos');
            });
        });
}

