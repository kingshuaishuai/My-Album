const router = require('koa-router')();
const controller = require('../controller/c-myalbum');

router.get('/myalbum', controller.getMyAlbum);

module.exports = router;