const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  // Configuração do CMS Netlify
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");
  
  // Shortcode para imagens otimizadas
  eleventyConfig.addAsyncShortcode("image", async function(src, alt, sizes) {
    let metadata = await Image(src, {
      widths: [300, 600, 900, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./public/images/"
    });
    
    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };
    
    return Image.generateHTML(metadata, imageAttributes);
  });
  
  return {
    dir: {
      input: "src",
      output: "public",
      includes: "templates"
    },
    passthroughFileCopy: true
  };
};