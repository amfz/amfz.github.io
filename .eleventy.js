const Image = require("@11ty/eleventy-img");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["avif", "jpeg", "png"]
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
    // plugins
    eleventyConfig.addPlugin(syntaxHighlight);
    
    // code for managing images
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    eleventyConfig.addLiquidShortcode("image", imageShortcode);
    eleventyConfig.addJavaScriptFunction("image", imageShortcode);

    // filters
    eleventyConfig.addFilter("formatDate", function(date, format) {
      let dtArray = date.split("-");
      dt = new Date(dtArray[0], dtArray[1]-1, dtArray[2]);
      return DateTime.fromJSDate(dt).setLocale("en").toFormat(format);
    });

    // passthroughs
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("./posts/**/img/*");
    eleventyConfig.addPassthroughCopy("./projects/**/img/*");

    let markdownIt = require("markdown-it");
    let markdownItAttrs = require("markdown-it-attrs");
    let options = {
      html: true
    };
    let markdownLib = markdownIt(options).use(markdownItAttrs);
    
    eleventyConfig.setLibrary("md", markdownLib);
    
    return {
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dir: {
          layouts: '_includes'
        }
    };
};