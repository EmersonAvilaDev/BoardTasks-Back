const express = require('express');
const connectDataBase = require('../middlewares/connectDB');
const router = express.Router();

/* GET users listing. */
router.get('/',connectDataBase, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
