const fs = require("fs");
const path = require("path");
const sass = require("sass");

const readFile = function (path, json = false) {
  // The boll its used for json parsing

  if (json) {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
  }
  return fs.readFileSync(path, "utf-8");
};

const createCss = function (obj, modified) {
  if (!modified) {
    console.log("No need to recompile styles ");
    return;
  }
  const colors = readFile(
    path.join(__dirname, "./src/_data/colors.json"),
    true
  );
  const my_scss = `$primary:${colors.primary};\n$secondary:${colors.secondary};\n   `;
  fs.writeFileSync(
    `${path.join(__dirname, "./src/assets/sass/colors.scss")}`,
    `${my_scss}`
  );
  // This is for compiling the sass to css with the custom colors prop
  const css = sass.compile(
    `${path.join(__dirname, "./src/assets/sass/style.scss")}`,
    { OutputStyle: "compressed" }
  );
  // This is for writing all the css into the style.css
  fs.writeFileSync(
    `${path.join(__dirname, "./src/assets/css/style.css")}`,
    `${css.css}`
  );
  // This will prevent this function to run at every build
  obj.modified = false;
  fs.writeFileSync(
    `${path.join(__dirname, "./src/_data/colors.json")}`,
    `${JSON.stringify(obj)}`
  );
  console.log("Done compiling");
};

module.exports = { readFile, createCss };
