var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', {title: 'MainPage', success: req.session.success, errors: req.session.errors});
    req.session.errors = null;
});

router.post('/submit', function(req, res, next) {
    //Check Validity

    req.check('e_mail','Invalid E-Mail address').isEmail();
    req.check('password', 'Password is invalid').isLength({min:4}).equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
    }
    else {
        req.session.success = true;
    }
    res.redirect('/');
})
module.exports = router;