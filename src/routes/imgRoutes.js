import express from "express";
import {getImage} from "../controllers/trangChuController.js"
import { khoaAPI } from "../config/jwt.js";

const imgRoutes = express.Router();

imgRoutes.get("/get-image/:page/:size", khoaAPI, getImage);

export default imgRoutes