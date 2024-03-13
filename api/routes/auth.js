const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    gst: req.body.gst,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.statusMessage="Registered Successful!";
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if(user){ 
        const hashedPassword = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASS_SEC
          );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

              if(OriginalPassword == req.body.password ){
                
                  const accessToken = jwt.sign(
                    {
                    id: user._id,
                    isAdmin: user.isAdmin,
                    },
                    process.env.JWT_SEC,
                    {expiresIn:"3d"}
                  );

                   const { password, ...others } = user._doc;
                   res.statusMessage="Login Successful!";
                res.status(200).json({...others, accessToken});
  }
  else{
    res.statusMessage="Wrong Cradentials!";
    res.status(203).json("Wrong credentials!");

  }
        


}
      

        else{
          res.statusMessage="User Not Registered!";
          res.status(203).json("No user credentials!");
    }
  }
   catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
