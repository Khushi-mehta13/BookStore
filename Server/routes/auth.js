// Import necessary modules
import express from 'express';
import { Admin } from '../models/Admin.js';
import { Student } from '../models/Student.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; // Import crypto for hashing

// Create an instance of Express router
const router = express.Router();

// Function to hash the password
async function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Route for user login
router.post('/login', async (req, res) => {
    const { username, password, role } = req.body;
    if (role === 'admin') {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.json({ message: "Admin not registered" });
        }
        const hashedPassword = await hashPassword(password);
        if (hashedPassword !== admin.password) {
            return res.json({ message: "Password is incorrect" });
        }
        const token = jwt.sign({ username: admin.username, role: 'admin' }, process.env.Admin_Key);
        res.cookie('token', token, { httpOnly: true, secure: true });
        return res.json({ login: true, role: 'admin' });
    } else if (role === 'student') {
        const student = await Student.findOne({ username });
        if (!student) {
            return res.json({ message: "Student not registered" });
        }
        const hashedPassword = await hashPassword(password);
        if (hashedPassword !== student.password) {
            return res.json({ message: "Password is incorrect" });
        }
        const token = jwt.sign({ username: student.username, role: 'student' }, process.env.Student_Key);
        res.cookie('token', token, { httpOnly: true, secure: true });
        return res.json({ login: true, role: 'student' });
    } else {
        return res.json({ message: "Invalid role" });
    }
});

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid Admin" });
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if (err) {
                return res.json({ message: "Invalid token" });
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    }
};

// Middleware to verify user token
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid User" });
    } else {
        jwt.verify(token, process.env.Student_Key, (err, decoded) => {
            if (err) {
                return res.json({ message: "Invalid token" });
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    }
};

// Route to verify user authentication
router.get('/verfiy', verifyUser, (req, res) => {
    return res.json({ login: true, role: req.role });
});

// Route to handle user logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ logout: true });
});

// Export router and verifyAdmin middleware
export { router as AdminRouter, verifyAdmin };
