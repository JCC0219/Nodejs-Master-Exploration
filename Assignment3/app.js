const express = require("express");
const path = require("path")
const homeRoutes = require("./routes/home");
const userRoutes = require("./routes/user");
const app = express();

app.use(express.static(path.join(__dirname,"public")));

app.use(userRoutes);
app.use(homeRoutes);


console.log("active");

app.listen(3000);
