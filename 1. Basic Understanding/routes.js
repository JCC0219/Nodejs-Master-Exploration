const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end(); //quit here
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    //register even listerner using .on()

    //listen to data event
    req.on("data", (chunk) => {
      //   console.log(chunk.toString());
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString(); //retried the data from the form
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      }); //put this code here to make it run in async with other code
      //   console.log(parsedBody);
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello to my first server</h1></body>");
  res.write("</html>");
  res.end();

  // process.exit();
};

module.exports = requestHandler;

module.exports = {
    handler: requestHandler,
    someText:"some hard coded text"
}
