module.exports = Handlebars => {
  // Note the use of an anonymous function, rather then a fat arrow function
  // This is due to how `this` is passed around
  Handlebars.registerHelper('bold', function(options) {
    return new Handlebars.SafeString(`<strong>${options.fn(this)}</strong>`)
  })
}
