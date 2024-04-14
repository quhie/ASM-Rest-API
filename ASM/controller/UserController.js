const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.getAllUsers = async function(req, res, next) {
  const users = await User.find({}, '-password');
  res.json(users);
};

exports.registerUser = async function(req, res, next) {
  const { email, phone, password, name, role, avatar, carts, available } = req.body

  //validate phone
  const phoneRegex = /^\d{10}$/
  if (!phoneRegex.test(phone)) {
    res.json({ status: 'số điện thoại không hợp lệ' })
    return
  }
  //validate password
  if (password.length < 6) {
    res.json({ status: 'mật khẩu phải có ít nhất 6 ký tự' })
    return
  }

  //check if phone or email is already in use
  const existingUser = await User.findOne({ $or: [{ phone }, { email }] })
  if (existingUser) {
    res.json({ status: 'số điện thoại hoặc email đã được sử dụng' })
    return
  }

  const user = new User({
    email,
    phone,
    password: bcrypt.hashSync(password, 10),
    name,
    role,
    avatar,
    carts,
    available
  })
  await user.save()
  res.json({ status: 'đăng ký thành công' })
};

exports.loginUser = async function(req, res, next) {
  const { phone, password } = req.body

  const user = await User
    .findOne({ phone })
    .select('password')
  if (!user) {
    res.json({ status: 'Người dùng không tồn tại' })
    return
  }

  // Check if the entered password matches the hashed password in the database
  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    res.json({ status: 'Mật khẩu không đúng' })
    return
  }

  // If the password is correct, return the user's information (without the password)
  const userWithoutPassword = await User.findOne({ phone }).select('-password');
  res.json(userWithoutPassword)
};

exports.updateUser = async function(req, res, next) {
  const { id } = req.params;
  const { email, phone, name, password, role, avatar, carts, available } = req.body;

  const user = await User.findById(id);
  if (!user) {
    res.json({ status: 'Người dùng không tồn tại' })
    return
  }

  user.email = email;
  user.phone = phone;
  user.name = name;
  if (password) {
    user.password = bcrypt.hashSync(password, 10);
  }
  user.role = role;
  user.avatar = avatar;
  user.carts = carts;
  user.available = available;

  await user.save();
  res.json({ status: 'Cập nhật thành công' })
};

exports.getUserByPhone = async function(req, res, next) {
  const { phone } = req.params;

  const user = await User.findOne({ phone: phone });
  if (!user) {
    res.status(404).json({ status: 'Người dùng không tồn tại' });
    return;
  }
  res.json(user);
};

exports.deleteUser = async function(req, res, next) {
  const { id, password } = req.body

  const user = await User.findById(id)
  if (!user) {
    res.json({ status: 'Người dùng không tồn tại' })
    return
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    res.json({ status: 'Mật khẩu không đúng' })
    return
  }

  // If the password is correct, delete the user
  await User.findByIdAndDelete(id)
  res.json({ status: 'Xóa người dùng thành công' })
};
