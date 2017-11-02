const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const ejs = require('ejs');
app.set('view engine', 'ejs');
var request = require('request');

app.use(express.static('public'));

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile.js')[environment];
const knex = require('knex')(knexConfig);

const bcrypt = require('bcrypt-as-promised');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Homepage - with links to sign up form & log in form
app.get('/', function(req,res,next){
  res.render('Home');
})


// Get all users
app.get('/signup', function(req,res,next){
  console.log("Working up until this point!");
    res.render('signup');
})

app.get('/users', function(req,res,next){
  knex('user_accounts')
  .then(function(users){
    res.render('users', {users});
  })
})


// Create a user
app.post('/signup', function(req,res,next){
  const { firstname, lastname, birthdate, city, state, username, password } = req.body;
  console.log(req.body);
  bcrypt.hash(password, 12)
  .then(function(hashed_password){
    return knex('user_accounts').insert({
      firstname: firstname,
      lastname: lastname,
      birthdate: birthdate,
      city: city,
      state: state,
      username: username,
      hashed_password: hashed_password
    });
  })
  .then(function(){
    knex("user_accounts")
    .where("username", username)
    .first()
    .then(function(user){
      res.redirect('/users/'+user.id);
    })

  })
  .catch(function(err){
    next(err);
  });
});

// Getting the user profile page &
app.get('/users/:id', function(req,res,next) {
  var userArtists ="";
  const id = req.params.id;
  console.log(id);
  knex('user_accounts')
  .where('id', id)
  .first()
  .then(function(user){
    knex('user_accounts_artists')
    .where('user_account_id', id)
    .then(function(artistUsers){
      var url = "https://rest.bandsintown.com/artists/";
      var appId = "?app_id=lineupq2";

      for(var i = 2; i < artistUsers.length; i++){
        var searchTerm = artistUsers[i].artist_name;
        request(url + searchTerm + appId, function(error, response, body){
          var userArtists = JSON.parse(body);
          // console.log(userArtists);

          // console.log(response);
          // userArtists = response+response;
        })
        userArtists=userArtists+userArtists;

      }

    // console.log("This is userArtists: "+userArtists);

    })
  })
  .catch(function(err){
    next(err);
  })
})


// Making API call to BIT and getting the name of the artist
app.post('/users/:id/artists', function(req,res,next){
  var user_id = req.params.id;
  var artist = req.body.artist;

  var searchTerm = artist;
  var url = "https://rest.bandsintown.com/artists/";
  var appId = "?app_id=lineupq2";

  request(url + searchTerm + appId, function(error, response, body){
    var artist_id = JSON.parse(body).id
    knex('user_accounts_artists')
    .insert({
      artist_name: searchTerm,
      user_account_id: user_id
    })
    .then(function(){
      res.redirect('/users/'+user_id)
    })
  })
})


// Posting artist name to userprofile
app.post('/users/:id/artists', function(req,res,next){
  var user_id = req.params.id;
  var artist = req.body.name;

  knex('user_accounts_artists')
  .insert({
    artist_name: searchTerm,
    user_account_id: user_id
  })
  .then(function(){
    res.redirect('/users/'+user_id);
  })
})







app.listen(8000, function(){
  console.log('Listening at port', port)
});
