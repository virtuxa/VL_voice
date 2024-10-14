// middleware/authMiddleware.js
module.exports = function (req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }
    res.redirect('/login');
};
