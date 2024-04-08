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
        return res.status(err).json({ message: "Error: " + err });
    }
});

router.get('/books',async(req,res)=>{
    try{
        const books = await Book.find()
        return res.json(books)
    }
    catch(err){
        return res.json(err)
    }
})

router.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        return res.json(book);
    } catch (err) {
        return res.json(err);
    }
});

router.put('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndUpdate(id, req.body);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        return res.json({ updated: true, book }); // Changed Book to book
    } catch (err) {
        return res.json(err);
    }
});


router.delete('/book/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndDelete(id);
        return res.json({ deleted: true}); // Changed Book to book
    } catch (err) {
        return res.json(err);
    }
})

export { router as bookRouter };
