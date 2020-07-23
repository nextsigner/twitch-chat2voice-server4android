var setLtUrls=false
var args = process.argv.slice(2);
var puertoApp = '8080'; //Puerto que recibe acciones
var puertoStatico = '8081'; //Puerto para descargar archivos
var folderFiles = 'files/';
var serverEmail=process.env.EMAIL
var serverEmailPass=process.env.EMAILPASS
var serverEmailService=process.env.EMAILSERVICE

for(var i=0;i<args.length;i++){
    var com=args[i].split('=')
    if(args[i]==='-setlturls'){
        setLtUrls=true
    }
    if(com.length>=1&&com[0]==='-port1'){
        puertoApp=com[1]
    }
    if(com.length>=1&&com[0]==='-port2'){
        puertoStatico=com[1]
    }
    if(com.length>=1&&com[0]==='-folderFiles'){
        folderFiles=com[1]
    }
    if(com.length>=1&&com[0]==='-serverEmail'){
        serverEmail=com[1]
    }
    if(com.length>=1&&com[0]==='-serverEmailPass'){
        serverEmailPass=com[1]
    }
}


var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(puertoStatico);

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('port', process.env.PORT || puertoApp);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//require('./cn')(app);

var spawn = require('child_process').spawn;
function gtcProbe(){
    console.log("Probando google-translate-cli...");
    cp = spawn('./google-translate-cli/translate', [':en', 'Traductor Logiteca Activado']);
    cp.stdout.on("data", function(data) {
        console.log(data.toString().trim());
    });
    cp.stderr.on("data", function(data) {
        console.error(data.toString());
    });
}
//gtcProbe();


//-->Funciones de App

//Actualizar url lt
var url1=''
var url2=''
function updateLt(){
    var u1=url1.replace('your url is: ', '')
    var u2=url2.replace('your url is: ', '')
    console.log("Updating lt url...");
    cp = spawn("./setUrls.sh", [u1, u2]);
    //cp = spawn(process.env.comspec, ['/c', "lt", "--port", ""+puertoApp]);
    cp.stdout.on("data", function(data) {
        console.log(data.toString().trim());
    });
    cp.stderr.on("data", function(data) {
        console.error(data.toString().trim());
    });
}
var fs = require('fs');
var path = require('path');

app.listen(app.get('port'), function() {
    console.log('Servidor iniciado.');
    console.log('Puertos: App=' + app.get('port') + '  Files='+ puertoStatico);
});
