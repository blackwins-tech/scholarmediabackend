const express = require("express");
const router = express.Router();
const {
  index,
  index2,
  index3,
  store,
  destroy,
} = require("../controllers/tenant");
const { storeRequest } = require("../middlewares/tenant");
const { connectionRequest } = require("../middlewares/connection");

router.route("/tenants").get(index).post(storeRequest, store);
router.route("/tenants/:uuid").delete(destroy);
router.route("/tenants/view").get(index2);
router.route("/tenants/:uuid").put(index3);

module.exports = router;
