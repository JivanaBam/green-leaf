import express from "express";
import {
  loginAdminValidationSchema,
  registerAdminValidationSchema,
} from "./admin.validation.js";
import Admin from "./admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminValidateReqBody from "../middleware/validation.middleware.js";

const router = express.Router();

// register Admin
router.post(
  "/admin/register",
  adminValidateReqBody(registerAdminValidationSchema),
  async (req, res) => {
    // extract new admin from req.body
    const newAdmin = req.body;
    // console.log(newAdmin);

    //? check if admin with provided email already exists in our system
    //find admin by email
    const admin = await Admin.findOne({ email: newAdmin.email });

    //if match, throw error
    if (admin) {
      return res
        .status(409)
        .send({ message: "Admin with same email is already exists." });
    }

    //just before saving user, we need to creat hashed password
    const plainPassword = newAdmin.password;
    const saltPassword = 10; // to add randomness

    const hashedPassword = await bcrypt.hash(plainPassword, saltPassword);
    // console.log(hashedPassword);

    // update new admin password with hashed password
    newAdmin.password = hashedPassword;

    //save user
    await Admin.create(newAdmin);

    // send res
    return res
      .status(200)
      .send({ message: "Admin is registered successfully." });
  }
);

// logoin admin
router.post(
  "/login/admin",
  adminValidateReqBody(loginAdminValidationSchema),
  async (req, res) => {
    // extract login credentials from req.body
    const loginCredentials = req.body;

    // find admin by using email from login credentails
    const admin = await Admin.findOne({ email: loginCredentials.email });

    // if admin not found, throw new error
    if (!admin) {
      return res.status(404).send({ message: "Invalid credentials." });
    }

    // check for password match
    const plainPassword = loginCredentials.password;
    const hashedPassword = admin.password;

    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);

    //if password doesn't match, throw error
    if (!isPasswordMatch) {
      return res.status(404).send({ message: "Invalid credentials" });
    }

    // generate access token
    const payload = { email: admin.email };

    const token = jwt.sign(
      payload,
      "ada3dfd381175ae70c5eee38fcac96982268d16fcef9cb78c0abfed"
    );

    //to hide password
    admin.password = undefined;

    // send response
    return res
      .status(200)
      .send({ message: "Login success", adminDetails: admin, Token: token });
  }
);

export default router;
