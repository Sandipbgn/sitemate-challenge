// AddIssue.js
import React, { useState } from 'react';
import './AddIssue.css';

function AddIssue({ onAddIssue }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await onAddIssue({ title, description });
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding issue:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-add-issue">
            <h2>Add Issue</h2>
            <input
                type="text"
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <input
                type="text"
                className="input-field"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <button type="submit" className="submit-button">Add Issue</button>
        </form>
    );
}

export default AddIssue;
