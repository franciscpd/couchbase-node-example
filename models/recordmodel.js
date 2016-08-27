var ottoman = require('ottoman');

var User = ottoman.model('User', {
  firstname: 'string',
  lastname: 'string',
  email: 'string'
});

module.exports = User;