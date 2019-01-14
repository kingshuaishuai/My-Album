const router = require('koa-router')();
const controller = require('../controller/c-changeinfo');

router.get('/changeinfo', controller.getChangeInfo);
router.post('/changeinfo', controller.postChangeInfo);

module.exports = router;