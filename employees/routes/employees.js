const express = require("express");
const router = express.Router();
const { employees, getTeachersList } = require("../controllers/employees");

router.route("/employees").get(employees);
router.route("/getteacherslist").get(getTeachersList);
module.exports = router;
