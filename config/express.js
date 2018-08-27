var express = require('express');
//biblioteca que faz o carregamento automatico de modulos
var load = require('express-load');

module.exports = function() {
    var app = express();
    //defeinie o EJS como o view engine do Express
    app.set('view engine', 'ejs');
    //define onde o ejs vai buscar as 'views' da aplicação.  
    //por default o ejs vai procurar os arquivos na pasta views na raiz do projeto
    //O caminho é relativo ao app.js que é o arquivo que levanta o servidor.
    app.set('views', './app/views');

    //carrega modulos a parti da pasta 'app'
    //a ordem de carregamento é importante, pois 'routes' depende de 'infra'
    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app);

   return app;
}