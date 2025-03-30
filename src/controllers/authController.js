const User = require("../model/User");
const bcrypt = require("bcryptjs");

// 🟢 Kullanıcı Kaydı
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Tüm alanlar gereklidir." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu e-posta zaten kullanılıyor." });
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası, tekrar deneyin.", error: error.message });
  }
};

// 🟢 Kullanıcı Girişi
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "E-posta ve şifre gereklidir." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Kullanıcı bulunamadı." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Yanlış şifre." });
    }

    req.session.user = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    res.redirect('/index');
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası, tekrar deneyin.", error: error.message });
  }
};

// 🟢 Kullanıcı Bilgilerini Getir (Oturum Açan Kullanıcı)
exports.getUser = (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Giriş yapmalısınız." });
    }

    res.json({ user: req.session.user });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası, tekrar deneyin.", error: error.message });
  }
};

// 🟢 Kullanıcı Çıkışı
exports.logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Çıkış yapılamadı." });
      }
      res.redirect('/login');
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası, tekrar deneyin.", error: error.message });
  }
};
