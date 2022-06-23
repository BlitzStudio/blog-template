const sass = require("sass");
const { readFile } = require("../assets/utils/utils.js");
const path = require("path");
const fs = require("fs");

const colors = readFile(path.join(__dirname, "../_data/colors.json"), true);
const my_scss = `$primary:${colors.primary};\n$secondary:${colors.secondary};\n   `;
fs.writeFileSync(
  `${path.join(__dirname, "../assets/sass/colors.scss")}`,
  `${my_scss}`
);

//This is for compiling the sass to css with the custom colors prop
const css = sass.compile(
  `${path.join(__dirname, "../assets/sass/style.scss")}`,
  { OutputStyle: "compressed" }
);
// This is for writing all the css into the style.css
fs.writeFileSync(
  `${path.join(__dirname, "../assets/css/style.css")}`,
  `${css.css}`
);
