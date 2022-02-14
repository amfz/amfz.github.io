---
date: "2022-01-29"
title: Building This Site
---

When it comes to web development, I am old and Out of Touch<sup>TM</sup>. The last time I came anywhere close to coding a site myself, Xanga was still a thing. Declaring "best viewed on [browser]" was still a thing. HTML5 was newly a thing (RIP `<marquee>`). Mobile-first was not a thing.

I dabbled in making websites since then -- tutorials on Bootstrap and responsive web design; full-screen leaflet.js maps; short-lived experiments with Pelican, R Blogdown, and GitHub Pages default Jekyll themes -- but nothing stuck. And I never got a sense of how it all fit together.

Suffice it to say, making this site was a Rip Van Winkle experience.

I can imagine what an 18th century farmer would feel seeing today's technology because I have tried to read about Making A Website From Scratch In 2022. There is so much more than I remember in terms of tooling, and so many new-to-me conveniences (CSS variables!).

What I wanted was a basic site that was:
1. legible on big and small screens, 
2. built with parts I could explain, and 
3. made with minimal fussing over tooling.

What happened is I spent a ton of time anyway learning about a bunch of tools I did not need and looking up n00b questions like "em vs rem", but that's okay. I have a site I understand now. And I know the difference between `em `and `rem`.

What follows are some notes from building this site from an empty folder.

## What Are All These Things?

### Tool Types
- **Static site generator**: Software that creates a websites based on data (e.g., Markdown files, API responses) and templates. The "static" part comes from the fact that the site does not change based on visitors' actions or changing data.
- **Templating engine**: A library that lets you write reusable templates, which comes in very handy for creating webpages that have a standard format. Use the templating engine's specified syntax to indicate what data (which can be stored in variables, markdown files, jsons, etc., or fetched from APIs) should go where.

### Individual Tools

- **Emmet**: A plugin that makes writing HTML and CSS more convenient, with features like abbreviations/shorthand for creating skeleton HTML, individual elements, and even Lorem Ipsum text. Built into VSCode [by default](https://code.visualstudio.com/docs/editor/emmet).
- **Eleventy**: A static site generator written in JavaScript. There are static site generators in lots of other languages, like Jekyll in Ruby and Hugo in Go, but I liked the idea of sticking to just HTML, CSS, and JS for the site.
- **Nunjucks**: A templating engine for JavaScript. Lets us define page structures with HTML, then plonk in data. It's essentially a port of Python's `jinja2`, which is also nice.
- **npm**: Stands for node package manager. A JavaScript package manager, analagous to Python's pip. How we add Eleventy and any other libraries or frameworks to the project.
- **Node.js**: A JavaScript runtime environment, which just means that it's an application that gives JavaScript code somewhere to run besides in the browser, i.e., it makes it possible to run JS code on your own computer or on a server. It's also a prerequisite for installing npm.
- **Bootstrap**: A front-end framework for building responsive sites. Probably best known for its grid system, which pre-dates CSS grid. While I started out with Bootstrap, I eventually decided to write my own stylesheet from scratch to get more CSS practice.

## How Do These Things Fit Together?

### Directory Structure

The most barebones site would consist of `package.json`, `index.md`, and the rendered HTML in the `/_site` directory.

- **`/`:** The root directory, where the whole project lives.
  - **`/_includes`:** Folder where page templates live.
     - **`layout.njk`:** A basic layout template using Nunjucks. It looks like HTML but with more curly braces.
  - **`/css`**: Folder I put custom CSS in. Note that if you install a framework like Bootstrap, that CSS is in `/node_modules`; you'd have to tell Eleventy to include file in the project configuration file, `.eleventy.js`.
  - **`/posts`** and **`/projects`**: Folders where I keep blog posts and project posts, respectively. Eleventy has [permalinking](https://www.11ty.dev/docs/permalinks/) and a [system of tags and collections](https://www.11ty.dev/docs/collections/) to organize content, but it's still convenient to group similar posts in a folder. 
    - **`posts.11tydata.js`** and **`projects.11tydata.js`**: Directory data files to do things like apply the same layout and tags to all pages in the directory.
  - **`/node_modules`**: Folder where, sensibly, libraries and packages downloaded for this project via npm can be found. Eleventy.js itself can be found here, for example. I didn't mess with this folder manually.
  - **`/_site`**: Folder that Eleventy automatically creates and populates with the rendered static site. I did't really touch this folder, either.
  - **`index.md`**: The homepage content -- just in markdown. The templating engine slots the text here into the appropriate template in `/includes`. Which template to use can be specified in the markdown file's front matter, which is what I did, or in an `11tydata.js` file.
  - **`.eleventy.js`**: The configuration file. This is where you tell Eleventy things like what templating engine to use and whether to copy certain files, like images or Bootstrap's CSS file, to the `/_site` folder without any additional processing.
  - **`package.json`** and **`package-lock.json`**: Node project files that store metadata, configuration details, and dependencies for a project. 


## Things That Tripped Me Up

- **Adding `bootstrap.css` and `bootstrap.bundle.js` to the site**: Files in `node_modules` are not copied to `_site` by default -- I had to add the following to `.eleventy.js`:

```javascript
eleventyConfig.addPassthroughCopy({
  "node_modules/bootstrap/dist/css/bootstrap.min.css": "css/bootstrap.min.css",  
  "node_modules/bootstrap/dist/css/bootstrap.min.css.map": "css/bootstrap.min.css.map",  
  "node_modules/bootstrap/dist/js/bootstrap.bundle.js": "js/bootstrap.bundle.js"
 });
```
- **Code block overflows**: The code block above would overflow the underlying grid no matter what CSS styles I tried with the `code` and `pre` selectors. It turned out the solution was to modify the main style to have min-width and overflow values:

```css
main {
  min-width: 0;
  overflow: auto;
}
```

## Resources

Stuff I found especially useful in getting this off the ground. 

- **[Let's learn Eleventy! (with Zach Leatherman) — Learn With Jason](https://www.youtube.com/watch?v=j8mJrhhdHWc)**: Code-along that starts from an empty folder
- **[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web)**: CSS, HTML, and JS reference
- **[Fluid-responsive font size calculator](https://websemantics.uk/tools/responsive-font-calculator/)**: Generates CSS styles for font sizes that scale to screen size without using `@media` queries
- **[Type Scale](https://type-scale.com/)**: For setting `h*` font size value ranges. Headers use a minor third scale for smaller screens and a major third scale for bigger screens.