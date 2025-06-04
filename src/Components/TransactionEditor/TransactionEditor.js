import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { sampleTransaction } from '../../Services/api';
import './TransactionEditor.css';

const TransactionEditor = ({ transaction, setTransaction }) => {
  const [editMode, setEditMode] = useState(false);
  const [tempTransaction, setTempTransaction] = useState(
    JSON.stringify(transaction, null, 2)
  );

  const handleLoadSample = () => {
    setTransaction(sampleTransaction);
    setTempTransaction(JSON.stringify(sampleTransaction, null, 2));
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(tempTransaction);
      setTransaction(parsed);
      setEditMode(false);
    } catch (e) {
      alert('Invalid JSON: ' + e.message);
    }
  };

  const handleChange = (e) => {
    setTempTransaction(e.target.value);
  };

  return (
    <Box className="transaction-editor">
      <Typography variant="h6" gutterBottom>
        Transaction Payload
      </Typography>

      <Button
        variant="outlined"
        onClick={handleLoadSample}
        sx={{ mb: 2 }}
      >
        Load Sample
      </Button>

      {editMode ? (
        <>
          <TextField
            fullWidth
            multiline
            rows={10}
            value={tempTransaction}
            onChange={handleChange}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mt: 2 }}
          >
            Save Transaction
          </Button>
        </>
      ) : (
        <>
          <pre className="transaction-preview">
            {JSON.stringify(transaction, null, 2)}
          </pre>
          <Button
            variant="outlined"
            onClick={handleEdit}
            sx={{ mt: 2 }}
          >
            Edit Transaction
          </Button>
        </>
      )}
    </Box>
  );
};

export default TransactionEditor;