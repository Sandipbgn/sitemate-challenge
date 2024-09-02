// src/App.js
import React, { useState, useEffect } from 'react';
import './index.css';
import IssuesList from './Components/IssuesList';
import AddIssue from './Components/AddIssue';
import axios from 'axios';

function App() {
  const [issues, setIssues] = useState([]);

  const fetchIssues = async () => {
    try {
      const response = await axios.get('/api/issues');
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const addIssue = async (issue) => {
    try {
      console.log('issue:', issue);

      await axios.post('/api/issues', issue);
      fetchIssues();
    } catch (error) {
      console.error('Error adding issue:', error);
    }
  };

  const deleteIssue = async (id) => {
    try {
      await axios.delete(`/api/issues/${id}`);
      fetchIssues();
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  const updateIssue = async (id, issue) => {
    try {
      await axios.put(`/api/issues/${id}`, issue);
      fetchIssues(); // Fetch all issues again to update
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };


  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="container">
      <AddIssue onAddIssue={addIssue} />
      <IssuesList issues={issues} onDelete={deleteIssue} onUpdate={updateIssue} />
    </div>
  );
}

export default App;
