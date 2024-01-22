var http = require('http');
var app = require('./app');
var normalizePort = val => {
    var port = parseInt(val,10);
    if(isNaN(port)){
        return val;   
    }
    if(port>=0){
        return port;
    }
    return false;
    
}

const port = normalizePort(process.env.PORT || 8080)
app.set('port',port)
server = http.createServer(app);

server.listen(port,(error)=>{
    if(error){
        console.log(error)
    }
    console.log('connected to the server at  port '+ port + " " + normalizePort());
});
