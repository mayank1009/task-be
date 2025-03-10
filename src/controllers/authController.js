const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const transporter = require('../utils/sendMail')

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if ((!name, !email, !password))
      return res
        .status(400)
        .json({ message: 'name, email, password is required!' });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'email already exist' });
    if (password.length < 8)
      return res
        .status(400)
        .json({ message: 'password must be greater than 8 characters' });
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.insertOne({ email, name, password: hashedPassword });
    res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    console.log('User Registration Error: ', err);
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      res.status(400).json({ message: 'email, password is required!' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .json({
        message: 'Login successfully',
        email: user.email,
        name: user.name,
        token,
      });
  } catch (err) {
    console.log('User Login Error: ', err);
    res.status(400).json({ message: err.message });
  }
};

const requestResetPassword = async (req, res) => {
  const { email } = req.body;
  try{
    const user = await User.findOne({email})
    if (!user) return res.status(400).json({ message: 'Invalid email' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Click the link below to reset your password:</p>
             <a href='${resetLink}'>${resetLink}</a>`,
    });
    res.status(200).json({ message: 'Password reset email sent'})
  }catch (err) {
    console.log('Reset password request Error: ', err);
    res.status(400).json({ message: err.message });
  }
};

const resetPassword= async (req, res) => {
  const {token, newPassword} = req.body
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: 'Invalid token or user not found'});
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
  }catch (err) {
    console.log('Reset password Error: ', err);
    res.status(400).json({ message: err.message });
  }
} 

module.exports = { register, login, requestResetPassword, resetPassword };
