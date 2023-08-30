# Configuration

1. To run this code, please configure a MongoDB Atlas database from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).

2. Modify the code at `utils/database.js` to use your own database connection link.

## Running the Application

1. Install the required dependencies using the command:

```bash
npm install
npm start
```


#Tips:

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

## to use csrf protection:
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
  console.log(res.locals)
  next()
});
```

html view page should include code below in every post request(form)
The name must be `name="_csrf"`. the value csrfToken will retrive automatically from the `res.locals`
```html
<input type="hidden" name="_csrf" value="<%= csrfToken%>">
```

## to share data acrros request we can use flash
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
