const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'library'
});
connection.connect();
const cors = require('cors');

//This is code to request body
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());//all request bodies in JSON are
                          //built into req.body only if content type is application.json

app.use(bodyParser.urlencoded({extended:true}));

//ROOT URL => servername:port//
app.get('/', function(req, res) {
  console.log('hello *** ' + new Date());
  res.end('jet will def not hire me!');
});

//req params//
app.get('/randomfight/:player1/:player2', function(req, res) {
  var p1 = req.params.player1;
  var p2 = req.params.player2;
  console.log('received request to fight for players', p1, p2);
  if(Math.random() > 0.5) res.end(p1 + ' wins!');
  else res.end(p2 + ' wins!')
});

app.get('/classics', function(req,res){
  connection.query('SELECT * FROM classics', function(err, books) {
    if(err) res.send(500); //http status code for internal server error
    res.json(books);
  });
});

app.post('/classics', function(req,res) {
  console.log(req.body);
  let query = 'INSERT INTO classics(author_id, title, type, year) ' +
  `VALUES(${req.body.author_id}, '${req.body.title}', '${req.body.type}', '${req.body.year}')`
  console.log(query);
  connection.query(query, function(err, result) {
    if(err){
      console.log(err);
      return res.send(500);
    }
    res.send('Success');
  });
});

app.put('/classics/:id', function(req,res) {
  let id = req.params.id;
  let rb = req.body;
  let query = 'UPDATE classics set ';
   if (rb.author_id) query += `author_id=${rb.author_id},`;
   if (rb.title) query += `title='${rb.title}',`;
   if (rb.year) query += `year='${rb.year}',`;
   if (rb.type) query += `type='${rb.type}',`;
   query = query.substr(0, query.length-1);
   query += ` WHERE id=${id}`;
   connection.query(query, function(err, rows) {
     if(err){
       console.log(err);
       return res.sendStatus(500);//internal server error status code
     }
     res.send('Success updating id: ' +id);
   });
});

app.delete('/classics/:id', function(req,res){
  let query = `DELETE FROM classics WHERE id=${req.params.id}`;
  connection.query(query, function(err, result) {
    if(err){
      console.log(err);
      return res.sendStatus(500);//internal server error status code
    }
    res.send('Success');
  });
});

app.get('/authors', function(req,res){
  connection.query('SELECT * FROM authors', function(err, books) {
    if(err) res.send(500); //http status code for internal server error
    res.json(books);
  });
});

app.post('/authors', function(req,res) {
  console.log(req.body);
  let query = 'INSERT INTO authors(name, dob, death, nationality, favorite_saying) ' +
  `VALUES('${req.body.name}', ${req.body.dob}, ${req.body.death}, '${req.body.nationality}', '${req.body.favorite_saying}')`
  console.log(query);
  connection.query(query, function(err, result) {
    if(err){
      console.log(err);
      return res.send(500);
    }
    res.send('Success');
  });
});

app.put('/authors/:id', function(req,res) {
  let id = req.params.id;
  let rb = req.body;
  let query = 'UPDATE authors set ';
   if (rb.name) query += `author_id=${rb.name},`;
   if (rb.dob) query += `title='${rb.dob}',`;
   if (rb.death) query += `year='${rb.death}',`;
   if (rb.nationality) query += `type='${rb.nationality}',`;
   if (rb.favorite_saying) query += `type='${rb.favorite_saying}',`;
   query = query.substr(0, query.length-1);
   query += ` WHERE id=${id}`;
   connection.query(query, function(err, rows) {
     if(err){
       console.log(err);
       return res.sendStatus(500);//internal server error status code
     }
     res.send('Success updating id: ' +id);
   });
});

app.delete('/classics/:id', function(req,res){
  let query = `DELETE FROM classics WHERE id=${req.params.id}`;
  connection.query(query, function(err, rows) {
    if(err){
      console.log(err);
      return res.sendStatus(500);//internal server error status code
    }
    res.send('Success deleting id: ' +id);
  });
});

app.listen(1337);
console.log('listening on port leet, beeeyotch');
