import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/book/book/${id}`)
            .then(res => {
                const { name, author, imageUrl } = res.data;
                setName(name);
                setAuthor(author);
                setImageUrl(imageUrl);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        axios.put('http://localhost:3001/book/book/'+id, { name, author, imageUrl })
            .then(res => {
                if (res.data.updated) {
                    navigate('/books');
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));
    };
    
    return (
        <div className='student-form'>
            <div className="student-form-container">
                <form className='form-group' onSubmit={handleSubmit}>
                    <h2>Edit Book</h2>
                    <div className="form-group">
                        <label htmlFor='book'>Book Name:</label>
                        <input type='text' id="book" name="book" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor='author'>Book Author:</label>
                        <input type='text' id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor='image'>ImageUrl:</label>
                        <input type='text' id="image" name="image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                    </div>
                    <button type='submit'>Edit Book</button>
                </form>
            </div>
        </div>
    );
};

export default EditBook;
