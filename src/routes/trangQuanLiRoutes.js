import express from 'express';
import { deleteImageByID, getImgCreatedByUserID, getImgSavedByUserID, getInfoUser,  } from '../controllers/trangQuanLiController.js';
import { khoaAPI } from '../config/jwt.js';

const trangQuanLiRoutes = express.Router();

trangQuanLiRoutes.get("/getInfoUser", khoaAPI, getInfoUser);
trangQuanLiRoutes.get("/getImgSavedByUserID/:userID", khoaAPI, getImgSavedByUserID);
trangQuanLiRoutes.get("/getImgCreatedByUserID/:userID", khoaAPI, getImgCreatedByUserID);
trangQuanLiRoutes.delete("/deleteImageByID/:imageID", khoaAPI, deleteImageByID);

export default trangQuanLiRoutes