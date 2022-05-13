const express = require("express");
const router = express.Router();
const { index, viewbyid, store, destroy } = require("../controllers/tenant");
const { storeRequest } = require("../middlewares/tenant");
const { connectionRequest } = require("../middlewares/connection");

router.route("/tenants").get(index).post(storeRequest, store);
router.route("/tenants/:uuid").delete(destroy);
router.route("/tenantviewbyid").get(viewbyid);
module.exports = router;
