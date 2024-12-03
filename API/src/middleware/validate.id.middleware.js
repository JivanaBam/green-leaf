import mongoose from "mongoose";

const validateIdFromReqParams = (req, res, next) => {
  // extract id from req.params
  const id = req.params.id;

  // check for mongo id validity
  const isValidMongoId = mongoose.isValidObjectId(id);
  //   console.log(isValidMongoId);

  //if not valid monog id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // call next fun
  next();
};

export default validateIdFromReqParams;
