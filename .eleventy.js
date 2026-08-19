const yaml = require("js-yaml");
module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/icons");
  eleventyConfig.addPassthroughCopy("src/manifest.json");
  eleventyConfig.addPassthroughCopy("src/sw.js");
  eleventyConfig.addFilter("dateKr", function (dateObj) {
    const d = new Date(dateObj);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  });
  eleventyConfig.addFilter("groupByCourse", function (testimonialsObj) {
    const groups = {};
    Object.values(testimonialsObj || {}).forEach((t) => {
      if (!groups[t.course]) groups[t.course] = [];
      groups[t.course].push(t.quote);
    });
    return Object.keys(groups).map((course) => ({ course, quotes: groups[course] }));
  });
  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
