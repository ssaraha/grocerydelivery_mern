import express from "express";
import authUser from "../middleware/authUser.js";
import { add, getAddress } from "../controllers/addressController.js";

const addressRouter = express.Router();

addressRouter.post('/add', authUser, add)
addressRouter.get('/add', authUser, getAddress)

export default addressRouter;