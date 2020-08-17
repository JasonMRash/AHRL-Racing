// CS340 - Web Development
// Jason Rash, Grigori Barbachov
// Group Project - Backend API Server

// **********************************************************
// INIT
// **********************************************************
const express = require( 'express' );
const app = express();
const path = require('path');
const mysql = require( 'mysql' );
const pool = mysql.createConnection(process.env.JAWSDB_MARIA_URL);
const router = express.Router();
const apiSQL = require('./api_sql.js');

// **********************************************************
// MIDDLEWARE
// **********************************************************
app.use( express.urlencoded({ extended: false }) );
app.use( express.json() );
app.set( 'port', process.env.PORT || 5000 );

// **********************************************************
// SET ROUTES
// **********************************************************
app.use(express.static('frontend'));
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/frontend/index.html'));
});
router.get('/drivers',function(req,res){
  res.sendFile(path.join(__dirname+'/frontend/drivers.html'));
});
router.get('/licenses',function(req,res){
  res.sendFile(path.join(__dirname+'/frontend/licenses.html'));
});
router.get('/races',function(req,res){
  res.sendFile(path.join(__dirname+'/frontend/races.html'));
});
router.get('/seasons',function(req,res){
  res.sendFile(path.join(__dirname+'/frontend/seasons.html'));
});
router.get('/tracks',function(req,res){
  res.sendFile(path.join(__dirname+'/frontend/tracks.html'));
});
router.get('/raceresults',function(req,res){
  res.sendFile(path.join(__dirname+'/frontend/raceresults.html'));
});
app.post( '/api', handlerAPI );
app.use(handler404);
app.use(handler500);

// **********************************************************
// START LISTENING FOR REQUESTS
// **********************************************************
app.listen(app.get('port'), function() {
	console.log('API SERVER STARTED');
	console.log(`Port: ${app.get('port')}`);
	console.log(`Press Ctrl-C to terminate.`);
});

// **********************************************************
// ROUTE HANDLER - POST /api
// **********************************************************
function handlerAPI(req, res) {

    let query = undefined;
    if (req.body.action != undefined
        && req.body.table != undefined 
        && apiSQL[req.body.action] != undefined)
            query = apiSQL[req.body.action][req.body.table];

    if (query == undefined) {
        let err = 'Can not find matching query in API database';
        debugInfo(req, res, query, err, '');
        res.status(500);
        res.send(err);
        return;
    }

    pool.query(query, req.body.params, function(err, result) {
        debugInfo(req, res, query, err, result);
        if (err) { 
            res.status(500);
            res.send(err);
            return;
        }
        res.send(result);
    });
}

// **********************************************************
// ROUTE HANDLER - 404 / 500
// **********************************************************

// handle 404 error
function handler404(req, res) {
	res.type('text/plain');
	res.status(404);
	res.send( '404 - Not Found' );
}

// handle 500 error
function handler500(err, req, res, next) {
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.send('500 - Server Error');
}


// **********************************************************
// HELPER METHODS
// **********************************************************

function debugInfo(req, res, query, err, result) {

    console.log('\n\nREQUEST RECEIVED');
	console.log('QUERY :', req.query);
	console.log('BODY  :', req.body);
	console.log('SQL   :', query);
	if (err) {
		console.log('RESULT: error', err);
	} else {
		console.log('RESULT: success', result);
	}
}