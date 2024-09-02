// src/components/IssuesList.js
import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import EditIssue from './EditIssue';
import './IssuesList.css';

function IssuesList({ issues, onDelete, onUpdate }) {
    const [editIssue, setEditIssue] = useState(null);

    const handleEdit = (issue) => {
        setEditIssue(issue);
    };

    const handleClose = () => {
        setEditIssue(null);
    };

    return (
        <div>
            <h2>Issues</h2>
            <ul className="issues-list">
                {issues.map(issue => (
                    <li key={issue.id} className="issue-item">
                        <div className="issue-text">
                            {issue.title} - {issue.description}
                        </div>
                        <div className="icons">
                            <FiEdit style={{ cursor: 'pointer', color: '#555', fontSize: '1.5em' }} onClick={() => handleEdit(issue)} />
                            <MdDelete style={{ cursor: 'pointer', color: 'red', fontSize: '1.5em' }} onClick={() => onDelete(issue.id)} />
                        </div>
                    </li>
                ))}
            </ul>
            {editIssue && (
                <EditIssue issue={editIssue} onUpdate={onUpdate} onClose={handleClose} />
            )}
        </div>
    );
}

export default IssuesList;
