const { DateTime } = require("luxon");
const { readFile, createCss } = require("./utils");
const path = require("path");
const colors = readFile(path.join(__dirname, "./src/_data/colors.json"), true);

const yaml = require("js-yaml");
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

  // This plugin minify html,json,xml,xsl and webmanifest

  eleventyConfig.addPlugin(require("@sherby/eleventy-plugin-files-minifier"));

  createCss(colors, colors.modified);

  return {
    dir: {
      input: "src",
      output: "site",
    },
  };
};
