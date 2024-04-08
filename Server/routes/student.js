import express from 'express';
import { Student } from '../models/Student.js';
import crypto from 'crypto';
const router = express.Router();
import { verifyAdmin } from './auth.js';

async function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

router.post('/register', verifyAdmin, async (req, res) => {
    try {
        const { username, password, roll, grade } = req.body;
        const student = await Student.findOne({ username });
        if (student) {
            return res.json({ message: "Student is already registered" });
        }
        const hashedPassword = await hashPassword(password);
        // Check if hashedPassword matches with the stored hashed password in the database (if needed)

        const newStudent = new Student({
            username,
            password: hashedPassword, // Store the hashed password
            roll,
            grade
        });
        await newStudent.save();
        return res.json({ registered: true });
    } catch (err) {
        return res.status(500).json({ message: "Error: " + err });
    }
});

export { router as studentRouter };
