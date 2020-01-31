const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const app = express();

const users = require('./api/routes/user');
const events = require('./api/routes/event')

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(cors());

// DB Config
const db = require('./config/keys').mongoURI;

// connect to Mongo
mongoose
  .connect(db,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
  })
  .then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err));

  // Use Routes
  app.use('/api/users',users)
  app.use('/api/event',events)


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at ${port}`));
