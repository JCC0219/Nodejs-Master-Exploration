const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  const data = req.data;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Assignment 1</title></head>");
    res.write("<body><h1>Hello to my Assignment 1</h1></body>");
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="userName"><button type="submit">userName</button></form></body>'
    );
    res.write("</html>");
    return res.end(); //quit here
  }

  if (url === "/user") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Assignment 1</title></head>");
    res.write(
      "<body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>"
    );
    res.write("</html>");
    return res.end(); //quit here
  }
  if (url === "/create-user") {
    const body = [];
    req.on("data", (chunk) => {
      // console.log(chunk.toString());
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody)
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }
};

module.exports = requestHandler;
