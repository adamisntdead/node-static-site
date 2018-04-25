# Write You A Static Site Generator ⚡️
> My talk for the NodeJS Dublin Meetup, April 2018

**Description:** The JAM stack has become a popular way of developing sites. 
In this talk, I will go through the process of building a static site generator. 
I will talk about the choices to make when designing your own, why NodeJS is well suited for this, and will cover actually writing one in the talk. 
Lastly, I will discuss the current state of the JAM stack, and when you should think about using it.

**Rough Talk Duration:** 30-40 minutes

**Slides:** Available on [slides.com](https://slides.com/adamkelly-2/deck/#/)
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

