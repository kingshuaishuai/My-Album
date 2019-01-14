const router = require('koa-router')();
const controller = require('../controller/c-viewpassword');

router.get('/viewpassword', controller.getPassword);

module.exports = router;