const router = require('koa-router')();
const controller = require('../controller/c-uploadimg');

router.get('/uploadimg', controller.getUploadImg);
router.post('/uploadimg', controller.postUploadImg);

module.exports = router;