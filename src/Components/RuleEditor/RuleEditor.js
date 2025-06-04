import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Button, Box, Typography } from '@mui/material';
import './RuleEditor.css';

const RuleEditor = ({ initialValue, onSave, onValidate }) => {
  const [code, setCode] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateSyntax(code);
  }, [code]);

  const validateSyntax = (codeToValidate) => {
    try {
      // Basic syntax validation
      new Function(codeToValidate);
      setIsValid(true);
      onValidate(true);
    } catch (e) {
      setIsValid(false);
      onValidate(false);
    }
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <Box className="code-editor-container">
      <Typography variant="h6" gutterBottom>
        Rule Editor
      </Typography>
      <Editor
        height="300px"
        defaultLanguage="javascript"
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => onSave(code)}
        disabled={!isValid}
        sx={{ mt: 2 }}
      >
        Save Rule
      </Button>
      {!isValid && (
        <Typography color="error" sx={{ mt: 1 }}>
          Rule contains syntax errors
        </Typography>
      )}
    </Box>
  );
};

export default RuleEditor;