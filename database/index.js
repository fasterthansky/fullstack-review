const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.once('open', function() {
  console.log('success!')
})

let repoSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  // owner_login: String,
  html_url: String,
  forks: Number,
  description: String,
});

  let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  var newRepo = new Repo(repo);

  newRepo.save((err, repo) => {
    if (err) {return console.log(err)}
})
}


module.exports = {save, db, Repo}
// module.exports.fetch = fetch;