const ampify = require('ampify')

module.exports = Handlebars => {
  // Note the use of an anonymous function, rather then a fat arrow function
  // This is due to how `this` is passed around
  Handlebars.registerHelper('amp', function(options) {
    return new Handlebars.SafeString(ampify(options.fn(this), { cwd: 'public' }))
  })
}
