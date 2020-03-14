const db = require('../database/index.js')
const github = require('../helpers/github.js');
const express = require('express');
const bodyParser = require('body-parser');
const Repo = db.Repo;


let app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));

// parse application/json
// app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // console.log('am i talking ot the server');
  console.log(req.body)

  // let saveRepos = (repos) => {repos.forEach(db.save)};
  github.getReposByUsername(req.body.username);
  res.send('completed');
  // res.status(200).send('success')
  // save the repo information in the database
  // res.status(200).send(req.body);
// github.getReposByUsername(req.body['term'])

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
Repo.find(function (err, repos) {
  if (err) return console.error(err);
  res.send(repos)
}).limit(25).sort( {forks: -1})
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

