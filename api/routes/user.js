const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// User Model
const User = require("../../models/user");

// @route  GET api/users
// @desc   Get All Users
// @access Public

router.get("/", (req, res) => {
  User.find().then(users => res.json(users));
});

// @route  GET api/user
// @desc   Get one User
// @access Public

router.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => res.json(user._id));
});

// @route  POST api/users
// @desc   Create A User
// @access Public

// router.post("/add", (req, res) => {
//   const newUser = new User({
//     email: req.body.email,
//     password: req.body.password,
//     dataofcreation: req.body.dataofcreation
//   });
//   newUser.save().then(user => res.json(user));
// });

// @route  POST api/users
// @desc   Create A User with beta Crypt
// @access Public

router.post("/", (req, res) => {
  const { email, password, dataofcreation, privelege } = req.body;
  User.findOne({ email }).then(user => {
    if (user) return res.json({ msg: "user already exists" });
    else {
      const newUser = new User({
        email,
        password,
        dataofcreation,
        privelege
      });
      bcrypt.genSalt(10, (err, salt) => {
console.log('salt', salt)

        if(err) throw err
        bcrypt.hash(password, salt, (err, hash) => {
          if(err)throw err
          newUser.password = hash;
          newUser
            .save()
            .then(newuser => res.json(newuser))
            .catch(err => res.send(err));
        });
      });
    }
  });
});

// @route  PUR api/users
// @desc   Update An User
// @access Public

router.put("/:id", (req, res) => {
  const updateUser = req.body;
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { events: req.body.events } },
    { $set: { email: req.body.email , password: req.body.password} }
  )
    .then(data => res.send({ success: true }))
    .catch(err => res.send({ success: false }));
});

// @route  DELETE api/users
// @desc   Delete A User
// @access Public

router.delete("/:id", (req, res) => {
  User.findOneAndDelete(req.params.id).then(user =>
    user
      .remove()
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json({ success: false }))
  );
});

// @route  LOGIN api/login
// @desc   Login into an Account
// @access Public

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    console.log("user",user);
    if (!user) res.status(400).json({err:"err"});
    else {
      // console.log({ password, user });
      bcrypt
        .compare(password, user.password)
        .then(isMatched => {
          console.log('isMatched', isMatched)
          if (isMatched) {
            const payload = { id: user._id, email: user.email };
            jwt.sign(
              payload,
              "description",
              { expiresIn: 3600 },
              (err, token) => {
                if (err) res.status(500).json({err:err});
                else res.json({ token });
              }
            );

          } else res.status(400).json({err:"bad cred"});
        })
        .catch(err => res.send("server error",err));
    }
  });
});

//validation de token
//@access private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;