//Para rodar os testes: node_modules/mocha/bin/mocha
var http = require('http');
describe('#ProdutosController',function(){

    it('#listagem json',function(done){
        var configuracoes = {
            hostname: 'localhost',
            port:3000,
            path:'/produtos',
            headers: {
                'Accept' : 'application/json'
            }
        };

        http.get(configuracoes,function(res){
            if(res.statusCode == 200){
                console.log("Status ta ok");
            }

            if(res.headers['content-type'] == 'application/json;charset=utf-8'){
                console.log("Content type ok");
            }
            done();
        });       
    });
});