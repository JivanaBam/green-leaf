import express from "express";
import { isAdmin } from "../../middleware/authentication.middleware.js";
import validateReqBody from "../../middleware/validation.middleware.js";
import { categoriesValidationSchema } from "./categories.validation.js";
import Categories from "./categories.model.js";
import validateIdFromReqParams from "../../middleware/validate.id.middleware.js";

const router = express.Router();

// add category
router.post(
  "/add/category",
  isAdmin,
  validateReqBody(categoriesValidationSchema),

  async (req, res) => {
    // extract new category from req.body
    const newCategory = req.body;

    // extract loggedInAdminId
    const loggedInAdminId = req.loggedInAdminId;

    newCategory.adminId = loggedInAdminId;

    // create categories
    await Categories.create(newCategory);

    // send response
    return res.status(200).send({ message: "Category is added successfully." });
  }
);

// get category's details by id
router.get(
  "/category/details/:id",
  isAdmin,
  validateIdFromReqParams,

  async (req, res) => {
    // find categoryId from req.params
    const categoryId = req.params.id;
    // console.log(categoriesId);

    //find categories
    const category = await Categories.findOne({ _id: categoryId });

    // if not category,throw error
    if (!category) {
      return res.status(404).send({ message: "Category does not exist." });
    }

    // send res
    return res
      .status(200)
      .send({ message: "success", categoriesDetail: category });
  }
);

// delete category
router.delete(
  "/category/delete/:id",
  isAdmin,
  validateIdFromReqParams,

  async (req, res) => {
    // extract categoryId from req.params
    const categoryId = req.params.id;

    // find category
    const category = await Categories.findOne({ _id: categoryId });

    //if not category,throw error
    if (!category) {
      return res.status(404).send({ message: "Category does not exist." });
    }

    //? check category ownership
    //to be category owner: categoryId must be equal to loggedInAdminId
    const adminId = category.adminId;

    const loggedInAdminId = req.loggedInAdminId;

    const isCategoryOwner = adminId.equals(loggedInAdminId);

    //if not categoryOwner, throw error
    if (!isCategoryOwner) {
      return res
        .status(403)
        .send({ message: "You are not the owner of this category." });
    }

    // delete category
    await Categories.deleteOne({ _id: categoryId });

    //send res
    return res
      .status(200)
      .send({ message: "Category is deleted successfully." });
  }
);

// edit category
router.put(
  "/category/edit/:id",
  isAdmin,
  validateIdFromReqParams,
  validateReqBody(categoriesValidationSchema),

  async (req, res) => {
    // extract categoryId from req.params
    const categoryId = req.params.id;

    // find category
    const category = await Categories.findOne({ _id: categoryId });

    //if not category,throw error
    if (!category) {
      return res.status(404).send({ message: "Category does not exist." });
    }

    //? check category ownership
    //to be category owner: categoryId must be equal to loggedInAdminId
    const adminId = category.adminId;

    const loggedInAdminId = req.loggedInAdminId;

    const isCategoryOwner = adminId.equals(loggedInAdminId);

    //if not categoryOwner, throw error
    if (!isCategoryOwner) {
      return res
        .status(403)
        .send({ message: "You are not the owner of this category." });
    }

    // get new category from req.body
    const newCategory = req.body;

    // edit category
    await Categories.updateOne(
      { _id: categoryId },
      {
        $set: {
          ...newCategory,
        },
      }
    );

    // send res
    return res
      .status(200)
      .send({ message: "Category is updated successfully." });
  }
);

export default router;
