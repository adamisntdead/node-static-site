const Handlebars = require('handlebars')
const fs = require('fs-extra')
const glob = require('fast-glob')
const matter = require('gray-matter')
const slug = require('slug')
const path = require('path')
const marked = require('marked')

class Site {
  constructor(config) {
    this.config = config

    this.pages = []
    this.output = []
  }

  async build() {
    console.time('Build Time')

    await this.reset()
    await this.read()
    await this.render()
    await this.write()

    console.timeEnd('Build Time')
  }

  // Resets the public directory to empty
  async reset() {
    await fs.remove(this.config.public)
    await fs.mkdirp(this.config.public)
  }

  // Here is where the sites data is read, and turned into the internal data structures.
  // If there is a static directory given it is copied into the root of the public folder.
  async read() {
    if (this.config.static) {
      await fs.copy(this.config.static, this.config.public)
    }

    // I want to find any partials, and if so, I want to add them to handlebars
    // I like to keep partials out of my layouts folder, but of course this can be changed depending
    // on what workflow you want to use
    const partials = await glob('**/*.hbs', { cwd: 'partials' })
    for (let i = 0; i < partials.length; i++) {
      const fileContent = await fs.readFile(`partials/${partials[i]}`, 'utf8')
      Handlebars.registerPartial(partials[i].replace('.hbs', ''), fileContent)
    }

    const files = await glob('**/*', { cwd: 'content' })
    // For each file, build up a page object, and add it to the pages list
    for (let i = 0; i < files.length; i++) {
      // Read the file
      const fileContent = await fs.readFile(`content/${files[i]}`, 'utf8')

      // Get the front matter
      // This contains 2 main keys: data with the frontmatter, content with the content with the frontmatter removed
      // Here, gray-matter is being used as its fast and quite flexable. This could be changed if you wanted a different engine ect.
      const frontmatter = matter(fileContent)

      // If there is no title, use the filename without the extension
      const title = frontmatter.data.title
        ? frontmatter.data.title
        : files[i].replace(/\.[^/.]+$/, '')

      // Figure out the url
      const permalink = frontmatter.data.permalink
        ? frontmatter.data.permalink
        : slug(title)

      // Add the page to the pages object
      this.pages.push({
        title,
        permalink,
        content: frontmatter.content,
        ...frontmatter.data
      })
    }
  }

  // Here, the pages of the site are processed.
  // This is the main part of the static site generator, and is what really defined how you
  // be writing the sites.
  //
  // The renderer loops over the documents and pages and preforms the following:
  // 1. Render the pages using the template engine
  // 2. Runs the output through converters - this could be using something like markdown. I choose to keep this optional
  // 3. Put the pages in layouts. The layout is given in the frontmatter
  //
  // I decided to use handlebars, for no reason other then it supports plain HTML and I have used it before.
  // Templating engines tend to have similar APIs so swapping it out for another should be trivial
  async render() {
    for (let i = 0; i < this.pages.length; i++) {
      // Rendering the initial page with the template engine
      let renderedContent = Handlebars.compile(this.pages[i].content)({
        site: { pages: this.pages, ...this.config },
        page: this.pages[i]
      })

      // If markdown is true, then we want to render the file as markdown
      if (this.pages[i].markdown) {
        renderedContent = marked(renderedContent)
      }

      // Rendering the layout, and then passing in the rendered content
      if (this.pages[i].layout) {
        const layout = await fs.readFile(
          `layouts/${this.pages[i].layout}.hbs`,
          'utf8'
        )
        const template = Handlebars.compile(layout)

        renderedContent = template({
          site: { pages: this.pages, ...this.config },
          page: this.pages[i],
          content: renderedContent
        })
      }

      // Outputs are objects with 2 keys, the output path and the file contents
      this.output.push({
        path: path.join(
          this.config.public,
          this.pages[i].permalink,
          'index.html'
        ),
        content: renderedContent
      })
    }
  }

  // Here, the this.output array is written to the file system. The array contains objects with 2 keys: path and contents.
  // This function loops through them and writes `contents` to `path`
  async write() {
    const outputs = []

    for (let i = 0; i < this.output.length; i++) {
      // Note here that the fs-extra `outputFile` method is being used. This means that we don't have to worry about
      // creating the directory
      outputs.push(fs.outputFile(this.output[i].path, this.output[i].content))
    }

    return Promise.all(outputs)
  }
}

module.exports = Site
