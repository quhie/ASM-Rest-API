const Admin = require('../models/Admin');

exports.loginAdmin = async function(req, res, next) {
  const { username, password } = req.body

  const admin = await Admin
    .findOne({ username, password })
    // .select('password')
  try {
    if (!admin) {
      res.json({ status: 'Người dùng không tồn tại hoặc mật khẩu không đúng' })
      return
    }
    res.json({ status: 'Đăng nhập thành công' })
  } catch (err) {
    res.json({ message: err.message });
    console.log(err);
  }
};

exports.changePassword = async function(req, res, next) {
  const { username, password, newPassword } = req.body

  const admin = await Admin.findOne({ username, password })
  try {
    if (!admin) {
      res.json({ status: 'Người dùng không tồn tại hoặc mật khẩu không đúng' })
      return
    }
    admin.password = newPassword
    await admin.save()
    res.json({ status: 'Đổi mật khẩu thành công' })
  } catch (err) {
    res.json({ message: err.message });
    console.log(err);
  }
};
