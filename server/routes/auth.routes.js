import express from 'express'
import User from '../models/userModel.js'
import { registerValidation, loginValidation } from '../validation.js'
import bcrypt from 'bcryptjs'

const authRoute = express.Router()

//register route
authRoute.post('/register', async (req, res) => {
   
      // validate the user
      const { error } = registerValidation(req.body);
      
      if (error){
        console.log(error)
        return res.status(400).json({ error: error.details[0].message})
      }
      const isEmailExist = await User.findOne({ email: req.body.email });

      if (isEmailExist){
        return res.status(400).json({ error: "Email already exists" });
      }
      //hash the password
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password,
      })
      try {
        const savedUser = await user.save();
        res.json({ error: null, data: savedUser });
        console.log(savedUser)
      } catch (error) {
        console.log(error)
        res.status(400).json({ error });
      }

})

//login route
authRoute.post('/login', async(req, res) => {
  //validate the user
  const { error } = loginValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error:   error.details[0].message });
  console.log(error)
  const user = await User.findOne({ email: req.body.email })

  // throw error when email is wrong
  if (!user) return res.status(400).json({ error: "Email is wrong" });

  // check for password correctness
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).json({ error: "Password is wrong" });

  res.json({
    error: null,
    data: {
      message: "Login successful",
    },
  });

})


export default authRoute