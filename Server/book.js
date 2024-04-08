import express from 'express';
import { Book } from '../models/Book.js';
const router = express.Router();
import { verifyAdmin } from './auth.js';


router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const { name, author, imageUrl } = req.body;
        const newBook = new Book({
            name,
            author,
            imageUrl
        });
        await newBook.save();
        return res.json({ Added: true });
    } catch (err) {
        return res.status(500).json({ message: "Error: " + err });
    }
});

export { router as bookRouter };
