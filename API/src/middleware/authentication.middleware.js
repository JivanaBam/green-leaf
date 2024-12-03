import jwt from "jsonwebtoken";
import Admin from "../admin/admin.model.js";

export const isAdmin = async (req, res, next) => {
  //extract authorization from req.headers
  const authorization = req?.headers?.authorization;

  // extract token from authorization
  const splittedValues = authorization?.split(" ");

  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  // if not token, throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      "ada3dfd381175ae70c5eee38fcac96982268d16fcef9cb78c0abfed"
    );
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // find admin by email from payload
  const admin = await Admin.findOne({ email: payload.email });

  // if not admin, throw error
  if (!admin) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // user role must be admin
  if (admin.role !== "admin") {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // add loggedInAdminId to req
  req.loggedInAdminId = admin._id;

  // call next fun
  next();
};

export const isUser = async (req, res, next) => {
  //extract authorization from req.headers
  const authorization = req?.headers?.authorization;

  // extract token from authorization
  const splittedValues = authorization?.split(" ");

  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  // if not token, throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      "ada3dfd381175ae70c5eee38fcac96982268d16fcef9cb78c0abfed"
    );
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // find admin by email from payload
  const admin = await Admin.findOne({ email: payload.email });

  // if not admin, throw error
  if (!admin) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  //user role must be user
  if (admin.role !== "user") {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // add loggedInAdminId to req
  req.loggedInAdminId = admin._id;

  // call next fun
  next();
};
