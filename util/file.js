const fs = require("fs");

exports.deleteFile = (filePath, callback) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log('123');
      console.log(err);

      if (callback) {
        callback(err); // Pass the error to the callback
      } else {
        throw err; // Throw the error if no callback is provided
      }
    }
  });
};
