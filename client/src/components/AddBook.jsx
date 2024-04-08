import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        axios.post('http://localhost:3001/book/add', { name, author, imageUrl })
            .then(res => {
                if(res.data.Added){
                    navigate('/books');
                }
                else{
                    console.log(res);
                }
            })
            .catch(err => console.log(err));
    };
    
    return (
        <div className='student-form'>
            <div className="student-form-container">
                <form className='form-group' onSubmit={handleSubmit}>
                    <h2>Add Book</h2>
                    <div className="form-group">
                        <label htmlFor='book'>Book Name:</label>
                        <input type='text' id="book" name="book" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor='author'>Book Author:</label>
                        <input type='text' id="author" name="author" onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor='image'>ImageUrl:</label>
                        <input type='text' id="image" name="image" onChange={(e) => setImageUrl(e.target.value)} />
                    </div>
                    <button type='submit'>Add Book</button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;
