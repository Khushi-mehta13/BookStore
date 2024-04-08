import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./db.js";
import { AdminRouter } from "./routes/auth.js";
import { studentRouter } from "./routes/Student.js";
import { bookRouter } from "./routes/book.js";
import { Book } from "./models/Book.js";
import { Student } from "./models/Student.js";
import { Admin } from "./models/Admin.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));
app.use(cookieParser());

// Routes
app.use('/auth', AdminRouter);
app.use('/students', studentRouter);
app.use('/book',bookRouter);

app.get('/dashboard',async(req,res)=>{
  try{
    const student = await Student.countDocuments()
    const admin = await Admin.countDocuments()
    const book = await Book.countDocuments()
    return res.json({ok:true ,student,book,admin})
  }catch(err){
    return res.json(err);
  }
})
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
