const validateReqBody = (validationSchema) => {
  return async (req, res, next) => {
    // extract new data from req. body
    const newData = req.body;

    // validate data using schema
    try {
      const validatedData = await validationSchema.validate(newData);
      req.body = validatedData;
    } catch (error) {
      // if validation fails, throw error
      return res.status(400).send({ message: error.message });
    }

    // call next fun
    next();
  };
};

export default validateReqBody;
