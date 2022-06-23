const { readFile, createCss } = require("./utils");
const path = require("path");
const colors = readFile("./src/_data/colors.json", true);
createCss(colors, colors.modified);
