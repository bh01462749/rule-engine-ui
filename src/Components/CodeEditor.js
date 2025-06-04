import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { parse, parseExpressionAt } from 'acorn';
import { Button, message } from 'antd';

function CodeEditor({ module, onCodeChange }) {
  const [code, setCode] = useState(module?.code || '');
  const [isValidSyntax, setIsValidSyntax] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (module) {
      setCode(module.code);
      setIsDirty(false);
    }
  }, [module]);

  const handleEditorChange = (value) => {
    setCode(value);
    setIsDirty(true);
    checkSyntax(value);
  };

  const checkSyntax = (codeToCheck) => {
    try {
        // Try parsing as a full JavaScript program (statements, functions, etc.)
        parse(codeToCheck, { ecmaVersion: 2022 });
        setIsValidSyntax(true);
      } catch (error1) {
        try {
          // If full script parsing fails, try parsing as a single expression (e.g., business rule like "x > 5")
          parseExpressionAt(codeToCheck, 0, { ecmaVersion: 2022 });
          setIsValidSyntax(true);
        } catch (error2) {
          setIsValidSyntax(false);
        }
      }
  };

  const handleSave = () => {
    if (isValidSyntax && module) {
      onCodeChange(module.id, code);
      setIsDirty(false);
      message.success('Code saved successfully!');
    }
  };

  if (!module) return null;

  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <h3>{module.name}</h3>
        <span className="last-updated">
          Last updated: {new Date(module.lastUpdated).toLocaleString()}
        </span>
      </div>

      <div className="editor-wrapper">
        <Editor
          height="70vh"
          defaultLanguage="javascript"
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
      </div>

      <div className="editor-footer">
        {!isValidSyntax && (
          <span className="error-message">Syntax error in code</span>
        )}
        <Button
          type="primary"
          onClick={handleSave}
          disabled={!isValidSyntax || !isDirty}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default CodeEditor;