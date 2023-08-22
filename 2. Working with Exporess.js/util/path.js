const path = require("path");

//console.log(path.join(__dirname, "../"));
//or
console.log(path.dirname(process.mainModule.filename));

module.exports = path.dirname(process.mainModule.filename);
