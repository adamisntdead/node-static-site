const utils = require('./utils')
const Site = require('./core')

utils
  .getConfig()
  .then(config => new Site(config))
  .then(site => site.build())
  .catch(err => console.log(err))
