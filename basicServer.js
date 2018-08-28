// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var urlEncodedParser = bodyParser.urlencoded({extended:true});

// Certificate for SSL/HTTPS
/*const privateKey = fs.readFileSync('<letsencryptPrivateKey>', 'utf8');
const certificate = fs.readFileSync('<letsencryptCertification>', 'utf8');
const ca = fs.readFileSync('<letsencryptChain.Pem>', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};*/

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + "/" + "index.html" );
})

app.get('/testget', function (req, res) {
	res.send("Hi, this is a test page." );
})

// Get request response with parameter parse
app.get('/user/:id', function(req, res) {
    res.send('user ' + req.params.id);
});

// Post request response with parameter parse
app.post('/testpost', urlEncodedParser, function(req, res){
	res.send("Hi, " + req.body.name);
})

// Starting both http & https servers
const httpServer = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

// HTTPS will only work if SSL is enabled 
/*httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});*/
