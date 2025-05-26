import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({status:false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({status:true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({status:false, message: "Registration failed", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const payload = {
      userId: user._id,
      role: user.role
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    

    res.status(200).json({
      userId:user._id,
      accessToken,
      role: user.role,
      status:true,
      message: "Login successful"
    });
  } catch (err) {
    res.status(500).json({status:false, message: "Login failed", error: err.message });
  }
};


export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({status:false, message: "Unauthorized" });

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({status:false, message: "Forbidden" });

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({status:false, message: "Access denied" });
      }

      req.user = decoded;
      next();
    });
  };
};
