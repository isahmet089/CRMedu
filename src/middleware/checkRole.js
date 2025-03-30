// 🟢 Rol Kontrolü (admin)
const checkRole = (requiredRole) => {
    return (req, res, next) => {
      if (!req.session.user) {
        return res.redirect('/auth/login'); // Giriş yapmamışsa login sayfasına yönlendir
    }
  
      const userRole = req.session.user.role;
      if (userRole !== requiredRole) {
        return res.status(403).json({ message: "Bu işlemi yapma yetkiniz yok." });
      }
  
      next(); // Erişim izni verilirse sonraki işleme geç
    };
  };
  module.exports = checkRole;