const router = require('koa-router')();
const controller = require('../controller/c-admin');

router.get('/admin', controller.getAdmin);
router.post('/admin', controller.postAdmin);

module.exports = router;