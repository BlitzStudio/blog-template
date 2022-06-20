const yaml = require("js-yaml");
const { DateTime } = require("luxon");
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addWatchTarget("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addWatchTarget("./src/admin");
  eleventyConfig.addPassthroughCopy("./src/sitemap.xml");
  eleventyConfig.addWatchTarget("./src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("./src/robot.txt");

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  //This filter allow me to display only the last 3 articles
  // (At this momnet its only use on the homepage)
  eleventyConfig.addFilter("limit", function (arr, limit) {
    if (!arr.length) {
      return;
    }
    return arr.slice(0, limit);
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
