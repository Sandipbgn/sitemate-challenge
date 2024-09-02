// src/components/EditIssue.js
import React, { useState } from 'react';
import './EditIssue.css';
function EditIssue({ issue, onUpdate, onClose }) {
    const [title, setTitle] = useState(issue.title);
    const [description, setDescription] = useState(issue.description);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(issue.id, { title, description });
        onClose();  // Close modal on save
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit} className="form-edit-issue">
                    <h2>Edit Issue</h2>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                        required
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field"
                        required
                    />
                    <button type="submit" className="submit-button">Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default EditIssue;
