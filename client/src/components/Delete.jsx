import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Delete() {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.delete(`http://localhost:3001/book/book/${id}`)
            .then(res => {
                if (res.data.deleted) {
                    navigate('/books');
                } else {
                    console.error('Error deleting book:', res.data.error || 'Unknown error');
                }
            })
            .catch(err => {
                console.error('Error deleting book:', err);
            });
    }, [id, navigate]);

    return null;
}
