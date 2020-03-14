const request = require('request');
const config = require('../config.js');
const save = require('../database/index.js')

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  console.log("success")
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username.username}/repos`,
    // method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  function callback(error, response, body) {
    console.log(response.statusCode);
    if (error) {console.log(error)}
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      for (var i = 0; i<info.length; i++) {
        save.save({
          _id: info[i].id,
          name: info[i].name,
          html_url: info[i].owner.html_url,
          forks: info[i].forks,
          description: info[i].description
        })
      }
    }
  };
  console.log('hit');
  request(options, callback);
}

module.exports.getReposByUsername = getReposByUsername;