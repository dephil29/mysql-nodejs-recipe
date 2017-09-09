fetch('http://localhost:1337/classics', {
  method: 'GET'
}).then(function(serverResponse) {
console.log(serverResponse);
return serverResponse.text();
})
.then(function(res){
console.log(res);
});

fetch('http://localhost:1337/classics', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({author_id:17, title:'Wizlfazl Smith', type:'Biography', year: '2017'})
}).then(function(serverResponse) {
console.log(serverResponse);
return serverResponse.text();
})
.then(function(res){
console.log(res);
});

fetch('http://localhost:1337/classics/2', {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({author_id:17, title:'Hello There Friendo', type:'Science Fiction', year: '2017'})
}).then(function(serverResponse) {
console.log(serverResponse);
return serverResponse.text();
})
.then(function(res){
console.log(res);
});

fetch('http://localhost:1337/classics/4', {
  method: 'DELETE'
}).then(function(serverResponse) {
console.log(serverResponse);
return serverResponse.text();
})
.then(function(res){
console.log(res);
});

fetch('http://localhost:1337/authors', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({name:'Billy', dob: 1976, death: 2017, nationality: 'Mexican', favorite_saying:'Is that supposed to look like that?'})
}).then(function(serverResponse) {
console.log(serverResponse);
return serverResponse.text();
})
.then(function(res){
console.log(res);
});

fetch('http://localhost:1337/classics/6', {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
  name: 'Billy Bachanga',
  dob: '1976',
  death: '2017',
  nationality: 'Malta',
  favorite_saying: "I think we've got a case."
})
}).then(function(serverResponse) {
console.log(serverResponse);
return serverResponse.text();
})
.then(function(res){
console.log(res);
});
