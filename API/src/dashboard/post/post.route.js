import express from "express";
import { isAdmin } from "../../middleware/authentication.middleware.js";
import validateReqBody from "../../middleware/validation.middleware.js";
import { postValidationSchema } from "./post.validation.js";
import Post from "./post.model.js";
import validateIdFromReqParams from "../../middleware/validate.id.middleware.js";

const router = express.Router();

// add post
router.post(
  "/add/post",
  isAdmin,
  validateReqBody(postValidationSchema),

  async (req, res) => {
    // extract new post from req.body
    const newPost = req.body;

    // extract loggedInAdminId
    const loggedInAdminId = req.loggedInAdminId;

    newPost.adminId = loggedInAdminId;

    // create categories
    await Post.create(newPost);

    // send response
    return res.status(200).send({ message: "Post is added successfully." });
  }
);

// get post's details by id
router.get(
  "/post/details/:id",
  isAdmin,
  validateIdFromReqParams,

  async (req, res) => {
    // find postId from req.params
    const postId = req.params.id;

    // find post
    const post = await Post.findOne({ _id: postId });

    // if not post, throw error
    if (!post) {
      return res.status(404).send({ message: "Post does not exist." });
    }

    // send res
    return res.status(200).send({ message: "success", postDetail: post });
  }
);

// edit post
router.put(
  "/edit/post/:id",
  isAdmin,
  validateIdFromReqParams,
  validateReqBody(postValidationSchema),
  async (req, res) => {
    // extract postId from req.params
    const postId = req.params.id;

    // find post
    const post = await Post.findOne({ _id: postId });

    //if not post,throw error
    if (!post) {
      return res.status(404).send({ message: "Post does not exist." });
    }

    //? check post ownership
    //to be post owner: postId must be equal to loggedInAdminId
    const adminId = post.adminId;

    const loggedInAdminId = req.loggedInAdminId;

    const isPostOwner = adminId.equals(loggedInAdminId);

    //if not postOwner, throw error
    if (!isPostOwner) {
      return res
        .status(403)
        .send({ message: "You are not the owner of this post." });
    }

    // get new post from req.body
    const newPost = req.body;

    // edit post
    await Post.updateOne(
      { _id: postId },
      {
        $set: {
          ...newPost,
        },
      }
    );

    // send res
    return res.status(200).send({ message: "Post is updated successfully." });
  }
);

// delete post
router.delete(
  "/delete/post/:id",
  isAdmin,
  validateIdFromReqParams,
  async (req, res) => {
    // extract postId from req.params
    const postId = req.params.id;

    // find post
    const post = await Post.findOne({ _id: postId });

    //if not post,throw error
    if (!post) {
      return res.status(404).send({ message: "Post does not exist." });
    }

    //? check post  ownership
    //to be post owner: postId must be equal to loggedInAdminId
    const adminId = post.adminId;

    const loggedInAdminId = req.loggedInAdminId;

    const isPostOwner = adminId.equals(loggedInAdminId);

    //if not postOwner, throw error
    if (!isPostOwner) {
      return res
        .status(403)
        .send({ message: "You are not the owner of this post." });
    }

    // delete post
    await Post.deleteOne({ _id: postId });

    //send res
    return res.status(200).send({ message: "Post is deleted successfully." });
  }
);

export default router;
