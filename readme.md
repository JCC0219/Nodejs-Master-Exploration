# Configuration

1. To run this code, please configure a MongoDB Atlas database from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).

2. Modify the code at `app.js` to use your own database connection link.

```js
mongoose
  .connect("<paste your database api key here>")
  .then((result) => {
    console.log("connected to DB");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
```

3. edit the sendgird apikeys , details can be view at code below [SendGrid Confiugration](#add-simple-sending-email-function)

## Run the Application

1. Install the required dependencies using the command:

```bash
npm install
npm start
```

## Continuious
My Advanced Node-js Exploration with RESTAPI, GRAPHQL, Deploying,Testing and others@[JCC0219/NodeJs-Exploration-RESTAPI](https://github.com/JCC0219/NodeJs-Exploration-RESTAPI)


## shortcut

- [Session Cookie Using express-session](#session-cookie-that-accessible-to-specific-user)

- [Csurf Protection](#csrf-protection)

- [Share data across request using flash](#to-share-data-across-request-using-flash)

- [Add Simple sending email](#add-simple-sending-email-function-using-sendgrid)
  V
- [Validation package on node server](#validation-package-on-node-server)

- [To see how upload & download file work](#how-to-upload-and-returning-file)

- [PDFkit to generate pdf](#pdfkit-for-pdf-generation)

## Session cookie that accessible to specific user.

### Browser Cookie Storage and Session Management with Express.js

To enable session management in your Express.js application, use the following npm command:

```bash
npm install express-session
```

## Example Usage

Create and Integrate session management into your app by adding the following code:

```javascript
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);
```

after this code runs, you would be able to call `req.session` in the controller to retrieve the temporary session data within a session

## Session Handling

Session data is stored securely as a cookie in the browser. The cookie content is hashed, and a corresponding session entry is maintained in the server's database. However, please note that if the server restarts, session cookies will no longer function as they're stored server-side.

## Store Session outside of memory

To store the session outside of memory (to save server memory), you can use the package `connect-mongodb-session`. Install it using the command:

```bash
npm install connect-mongodb-session
```

change the create session on `app.js` folder then on `app.use` to:

```javascript
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
```

Example of store configuration

```javascript
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
```

## csrf protection:

install:

```bash
npm install --save csurf
```

### to import it and apply the middleware

```javascript
const csrfProtection = require("csurf");
const csrfProtection = csrf();
app.use(csrfProtection);
```

Before the route configuration in `app.js` run this code to generate token in every render view.

```javascript
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  console.log(res.locals);
  next();
});
```

html view page should include code below in every post request(form)
The name must be `name="_csrf"`. the value csrfToken will retrive automatically from the `res.locals`

```html
<input type="hidden" name="_csrf" value="<%= csrfToken%>" />
```

## To share data Across Request using flash

When we calling next request like `res.redirect()`, the current data will be alll removed, to share data, flash allow request to share data to next request (can think of a session)

to install flash:

```bash
npm install --save flash
```

to apply flash:

```javascript
const flash = require("connect-flash");
app.use(flash());
```

After setup, u can call flash at any controllers, eg:

please review the code for more detailed interpretation

```javascript
//to invalid message in error variable
req.flash("error", "Invalid email.");
//to call the save data
let message = req.flash("error"); // return array
```

## Add Simple sending email function Using SendGrid:

Installation:

```bash
npm install --save nodemailer nodemailer-sendgrid-transport
```

Setting up

1. Set up your sendgrid from [SendGrid](<https://sendgrid.com/?utm_source=google&utm_medium=cpc&utm_term=sendgrid&utm_campaign=SendGrid_G_S_APAC_Brand_(English)&gclid=Cj0KCQjwl8anBhCFARIsAKbbpyRDZcv1PTU8JTczuDKYhupd4roLhwahdCjZqKqg86h_fYZHxdIKmSEaAmzGEALw_wcB>).
2. Copy the api keys import to you project

```javascript
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: "<Your sendgrid api key>",
    },
  })
);
```

3. To send eail

```javascript
transporter.sendMail({
  to: email,
  from: "<Your email>",
  subject: "Signup succeeded!",
  html: "<h1>You have successfully signed up!</h1>",
});
```

## Validation package on node server

1. install package,checkout the [official documentation](https://express-validator.github.io/docs/api/validation-result/)

```bash
npm install --save express-validator
```

2. configure validation (Example as below:)

```js
//import
const { body } = require("express-validator");

// /admin/add-product => POST
Router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  productsController.postAddProduct
);
```

2. retrieve the result of validation (Example as below:)

```js
//import
const { validationResult } = require("express-validator");

//retrieve the validation result through request
exports.postAddProduct = (req, res, next) => {
  const errors = validationResult(req); //.array() to return an list of errors
  //....
  //....
  //rest of codes
};
```

## How To Upload and Returning file?

### Configuration

body parser only handle string value, but not file, to handle file we need to

1. install a thrid party package:

```bash
npm install --save multer
```

2. set the enctype in form tag with `multipart/form-data`

```html
<form action="Your action" method="POST" enctype="multipart/form-data"></form>
```

3. apply the middleware in `app.js` file after bodyparser check out [documentation](https://www.npmjs.com/package/multer) for more detail

```js app.js
//import
const multer = require("multer");

//configure filename and where to store it
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

//apply multer
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
); //dest : where to store file the string name must be same with the html element given name in a form

//in the controller use this to retrieve the data from multer
req.file;
```

## PDFKit for .pdf generation

- install the package

```bash
npm install --save pdfkit
```

- Example usage

```js
// import
const PDFDocument = require("pdfkit");

//implementation
const pdfDoc = new PDFDocument();
res.setHeader("Content-Type", "application/pdf");
res.setHeader("Content-Disposition", 'inline; filename="invoice.pdf"');
pdfDoc.pipe(fs.createWriteStream(invoicePath));
pdfDoc.pipe(res);
pdfDoc.text("Hello World");
pdfDoc.end();
```
