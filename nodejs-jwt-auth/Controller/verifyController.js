const User = require('../Model/usersSchema')
// otp
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

const sendOtp = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a 6-digit OTP
    const otp = otpGenerator.generate(6, {  digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false,specialChars: false });
    const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yugeshkaran01@gmail.com', // Replace with your email
        pass: 'scwj nztr szjx ysdw' // Replace with your email password
      }
    });

    const mailOptions = {
      from: 'yugeshkaran01@gmail.com',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is ${otp}. It is valid for 15 minutes.`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error });
  }
};

// reset password
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP is valid
    if (user.otp !== otp || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Update password
    user.password = newPassword; // Hash the password in real implementations
    user.otp = null; // Clear OTP
    user.otpExpiresAt = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
};


module.exports = {sendOtp, resetPassword}