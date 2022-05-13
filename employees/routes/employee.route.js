import { Router } from "express";
const router = Router();
import { checkToken } from "../auth/auth";
import {
  addEmp,
  viewEmp,
  loginEmp,
  updateEmp,
} from "../controllers/employee.controller";
import { connectionRequest } from "../middlewares/connection";

router.route("/employees/view").get(checkToken, connectionRequest, viewEmp);
router.route("/employees/add").post(connectionRequest, addEmp);
router.route("/employees/login").get(connectionRequest, loginEmp);
router.route("/employees/update").put(connectionRequest, updateEmp);

export default router;
