import { refreshTokenUserController } from "./../controllers/refreshTokenUserController";
import { authenticatedUserController } from "./../controllers/authenticatedUserController";
import { editPostController } from "./../controllers/editPostController";
import { getPostController } from "./../controllers/getPostController";
import { editUserController } from "./../controllers/editUserController";
import { getUserController } from "./../controllers/getUserController";
import { createUserController } from "./../controllers/createUserController";
import { Router } from "express";
import { deletePost } from "../services/deletePost";
import { getUserByIdController } from "../controllers/getUserByIdController";
import { createPostController } from "../controllers/createPostController";
import { deletePostController } from "../controllers/deletePostController";
import { authenticatedUserMiddleware } from "../middlewares/authenticate";
import { isAdminMiddleware } from "../middlewares/isAdmin";
import {addOrExcludeLikeController} from '../controllers/addOrExcludeLikeController'
import { UploadMulter } from "./multer";

const router = Router();

//GET USERS
router.get("/users", getUserController);
//DELETE USER
router.delete("/user/:id", deletePost);
//EDIT USER
router.put("user/:id", editUserController);
//GET USER BY ID
router.get("/users/:id", getUserByIdController);


//GET POSTS
router.get("/posts", getPostController);
//CREATE A POST
router.post("/post", UploadMulter.array("images"), createPostController);
//EDIT A POST
router.put("/post/:id", editPostController);
//DELETE A POST
router.delete("/post/:id", authenticatedUserMiddleware, deletePostController);
//LIKE AND DESLIKE POSTS
router.post("/liked-post", authenticatedUserMiddleware, addOrExcludeLikeController)

//AUTH
router.post("/signin", authenticatedUserController);
//SIGNUP
router.post("/signup", createUserController);
//REFRESH TOKEN
router.post("/refresh-token", refreshTokenUserController);

export { router };
