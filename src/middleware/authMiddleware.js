const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Giriş yapmamışsa login sayfasına yönlendir
    }
    next(); // Giriş yapmışsa sonraki işleme geç
};
const sessionMiddleware = (req, res, next) => {
    res.locals.user = req.session.user; // Oturum verilerini res.locals'a ekle
    next();
};
module.exports = {authMiddleware, sessionMiddleware};