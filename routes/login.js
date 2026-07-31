var express = require('express');
var router = express.Router();
const { auth } = require('../auth');
const { fromNodeHeaders } = require('better-auth/node');


/* GET home page. */
router.get('/', async function (req, res) {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
  if (session) {
    return res.redirect('/dashboard');
  }
  res.render('index', { title: 'Login' });
});

module.exports = router;
