const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;
const saltRounds = 10;
router.use(function(req, res, next) {
bcrypt.genSalt(saltRounds, function(err, salt) {
bcrypt.hash(req.body.password, salt, function(err, hash) {
req.hashedPassword = hash;
next();
});
});
})


//login

router.post("/login", async function (req, res, next) {
    const { username, password } = req.body;
    if (username && password) {
        const user = await User.findOne({ username }).exec();
        if (user) {
            // Compare hashed password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (isValidPassword) {
                const token = jwt.sign({ id: user._id }, privateKey, { algorithm: "RS256" });
                return res.status(200).json({ access_token: token });
            } else {
                return res.status(401).json({ error: "Invalid credentials." });
            }
        } else {
            return res.status(401).json({ error: "User not found." });
        }
    } else {
        res.status(400).json({ error: "Username or Password Missing" });
    }
});


    //register
    router.post("/register", async (req, res) => {
        const { username, password, passwordConfirmation } = req.body;
      
        if (!username || !password || !passwordConfirmation) {
          return res.status(400).json({ error: "Username or Password Missing" });
        }
      
        if (password !== passwordConfirmation) {
          return res.status(400).json({ error: "Passwords not matching" });
        }
      
        try {
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          const user = new User({ username, password: hashedPassword });
          const savedUser = await user.save();
          const token = jwt.sign({ id: savedUser._id }, privateKey, { algorithm: "RS256" });
          res.status(201).json({ access_token: token, id: savedUser._id, username: savedUser.username });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });
      
      module.exports = router;