const router = require('koa-router')();
const controller = require('../controller/c-myinfo');

router.get('/myinfo', controller.getInfo);

module.exports = router;