var express = require('express');
//biblioteca que faz o carregamento automatico de modulos
var load = require('express-load');
//Biblioteca que vai preencher a variavel body criada pelo express na requisição
var bodyParser = require('body-parser');
//Biblioteca para validação de dados
var expressValidator = require('express-validator');

module.exports = function() {
    var app = express();
    //defeinie o EJS como o view engine do Express
    app.set('view engine', 'ejs');
    //define onde o ejs vai buscar as 'views' da aplicação.  
    //por default o ejs vai procurar os arquivos na pasta views na raiz do projeto
    //O caminho é relativo ao app.js que é o arquivo que levanta o servidor.
    app.set('views', './app/views');

    //middlewares
    //adiciona o parser para fazer o parse do conteudo da requisição para urlencoded (formulário html)
    app.use(bodyParser.urlencoded({extended: true}));
    //adiciona o parser para fazer o parse do conteudo da requisição para json
    app.use(bodyParser.json());
    //adiciona a biblioteca que faz validação de dados (express-validator)
    app.use(expressValidator());

    //carrega modulos a parti da pasta 'app'
    //a ordem de carregamento é importante, pois 'routes' depende de 'infra'
    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app);

   return app;
}