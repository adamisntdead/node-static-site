# Write You A Static Site Generator ⚡️
> My talk for the NodeJS Dublin Meetup, April 2018

**Description:** The JAM stack has become a popular way of developing sites. 
In this talk, I will go through the process of building a static site generator. 
I will talk about the choices to make when designing your own, why NodeJS is well suited for this, and will cover actually writing one in the talk. 
Lastly, I will discuss the current state of the JAM stack, and when you should think about using it.

**Rough Talk Duration:** 30-40 minutes

**Generator Source Code:** [here](https://github.com/adamisntdead/construct)

## Generator

### Usage

Install the cli:

```bash
$ npm install -g construct-cli
```

Create a new folder, and create a new site inside of it

```bash
$ mkdir site
$ cd site
$ construct new
```

Build the site

```bash
$ construct build
```

## Presentation

Note that the source code uses [spectacle-code-slide](https://github.com/jamiebuilds/spectacle-code-slide), so use the down arrow to step through the code.

## Detailed Outline

> Note that I should change this into a condensed summary and leave the rest to speaker notes

* Intro
  * What Will Be Covered
    * Static Site Generators
    * The decisions that go into building them (picking tools and technologies)
    * Building a static site generator
    * Talk a bit about the JAM stack
  * About Me - Adam, TY student at skerries community college, using node for 2 years, now using it alongside Rust.
  * Questions - General questions until the end, questions about the code on the screen, font sizes, words anything like that is okay at any point
  * What Are Static Site Generators
  * Why You Would Use Them
    * Simplicity - Once its online, its online. No maintenance of installations, databases ect. Only maintain the static site server (which can even be abstracted with services such as [Netlify](netlify.com))
    * Security - CMSs such as Wordpress have vulnerabilities. When not up to date, it can lead to security issues. When you finish a site, there is less threat vectors. If you need extra features, you can add them in ways that reduce the vulnerabilities, such as using saas's or other managed services
    * Performance - Having a static site means that your web server only has to serve files, making your site more preformant. You also have the option of using caching and CDNs really easily. Load balancing also becomes really easy.
    * Flexibility - Personal anecdote about AMP / Changes !!!!!! Just pull down, make a change,
  * A Quick Look at other static site generators
    * jekyll
    * hugo
    * Metalsmith
    * Others (gatsby)
* Writing The Static Site Generator
  * Why would you write a SSG? - Great way to learn! Makes you approach problems in a different way. You will have an in depth knowledge of the internals, so you can debug quicker. No relyance on small projects
  * Why would you use Nodejs? - Ecosystem, Fast, Isomorphism, Well Supported
  * The 2 Big Questions
    * What Is Your Content
    * How Will You Edit Your Content
  * The 4 main parts of a static site generator
    * Cleaning
    * Reading
    * Rendering 
    * Writing
  * Picking Your Tools
    * Config - YAML, JSON, TOML
    * Generic - FS Extra, Fast-Glob, Gray Matter, Slug, Chockidar
    * Content - Markdown Renderers, Templating Libraries
  * Doing The Plumbing
    * ES6 Classes For Managing State
    * Different Methods, abstracting to smaller functions.
    * Plugins
      * What Sort Of Things Need Plugins
      * How Will You Integrate them - Dependency Injection, Modules, Full Plugin Systems (i.e. [architect](https://github.com/c9/architect)), Hooks calling different functions, extending base static site generator class
  * The Code Of A Generator
    * Tools I choose
    * Run through code, step by step as it was called.
  * Extending Your Static Site Generator - Asset Pipeline, Watching For Changes, CLI
* The **JAM** Stack
  * What is the JAM Stack - the JAM stack is a way of building websites. Its based on client side **j**avascript, reusable **API**s / microservices, and **m**arkup. Its not about specific tools, just a way of building things. MADE BY NETLIFY! **EXAMPLE?**
  * Best Practices
    * Everything on a CDN 
    * Atomic deploys
    * Instant cache invalidation
    * Version control everything
    * Automated builds
  * Node And The JAM stack - No monolithic server. Still, used for microservices (lambda?), site generators and other development tools. Javascript is everywhere, including the development tools.
  * JAM tools
    * E-Commerce: Gumroad, shopify 'buy', microserives with stripe, netlify gocommerce. 
    * Forms: Formspree! Typeform, Netlify has great forms. 
    * Search: Algolia, Google Custom, Lunr.js. 
    * CMS: Contentful, Prismic, Directus, Storyblok, dropbox, netlify CMS, https://headlesscms.org/ 
    * AWS 
    * Login: Auth0, Netlify has it 
    * Comments: Disqus, Facebook Comments, Github Comments
  * Why I wouldn't JAM - The JAM stack doesn't suit all projects. If your building a site for other people, reasons can be: Overall cost, total dev + maintain costs, Learning curve (do they know wordpress), Clients organization. Other reasons can just be the technical requirements. Some apps such as internal intranets can be easier to run and maintain as a monolith, especially if thats where the expertise of the team lies.

