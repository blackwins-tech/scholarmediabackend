const express = require('express')
const router = express.Router()
const { index, index2,store, destroy } = require('../controllers/tenant')
const { storeRequest } = require('../middlewares/tenant')
const { connectionRequest } = require('../middlewares/connection')

router.route('/tenants').get(index).post(storeRequest, store)
router.route('/tenants/:uuid').delete(destroy)
router.route('/tenantview').get(connectionRequest, index2);
module.exports = router