import React, { useState, useEffect } from 'react';
import { Container, Button, Typography } from '@mui/material';
import TransactionEditor from './../Components/TransactionEditor/TransactionEditor';
import RuleList from './../Components/RuleList/RuleList';
import ResultsPanel from './../Components/ResultsPanel/ResultsPanel';
import { evaluateRules } from './../Services/api';
import { sampleTransaction } from './../Services/api';
import './ExecutionPage.css'

function ExecutionPage() {
    // Silences the ResizeObserver warning
    window.__forceSmoothScrollPolyfill__ = true;
    const ignoreError = window.onerror;
    window.onerror = function(msg, source, lineno, colno, error) {
      if (msg.toString().includes('ResizeObserver')) return true;
      return ignoreError && ignoreError.apply(this, arguments);
    }

  const [transaction, setTransaction] = useState(sampleTransaction);
  const [rules, setRules] = useState([]);
  const [results, setResults] = useState(null);
  const [savedModules, setSavedModules] = useState([]);

  const [selectedCodes, setSelectedCodes] = useState([]);
  const [selectedCodeNames, setSelectedCodeNames] = useState([]);

  const handleCheckboxChange = (rule) => {
      setSelectedCodes(prevSelected =>
        prevSelected.includes(rule.code)
          ? prevSelected.filter(c => c !== rule.code)  // Remove if already selected
          : [...prevSelected, rule.code]              // Add if not selected
      );

      setSelectedCodeNames(prevSelected =>
              prevSelected.includes(rule.name)
                ? prevSelected.filter(c => c !== rule.name)  // Remove if already selected
                : [...prevSelected, rule.name]              // Add if not selected
            );
    };

  useEffect(()=>{
    const savedModules = JSON.parse(localStorage.getItem('codeModules')) || [];
    setSavedModules(savedModules);
  }, [])

 

  const handleRemoveRule = (index) => {
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
  };

  const handleEvaluate = async () => {
    try {
    console.log(rules)
      const response = await evaluateRules(transaction, selectedCodes);
      setResults(response);
    } catch (error) {
      console.error('Evaluation error:', error);
      setResults({
        approved: false,
        finalDecision: 'Error evaluating rules',
        firedRules: rules.map(rule => ({
          rule,
          result: false,
          reason: 'Evaluation error'
        }))
      });
    }
  };



  return (
    <div className="App2">
      <Container
        maxWidth={false}
        sx={{
             flex: '0 0 70%',
             display: 'flex',
             flexDirection: 'column',
             p: 2, // padding
             bgcolor: 'background.paper',
             borderRight: '1px solid',
             borderColor: 'divider'
        }}
      >
        <TransactionEditor
            transaction={transaction}
            setTransaction={setTransaction}
        />

        <RuleList
          rules={selectedCodeNames}
          onRemoveRule={handleRemoveRule}
        />

        <Button
           variant="contained"
           color="primary"
           onClick={handleEvaluate}
           disabled={selectedCodes.length === 0}
           size="large"
        >
           Evaluate Rules
        </Button>

        <ResultsPanel results={results} />
      </Container>
      <Container
      maxWidth={false}
              sx={{
                flex: '0 0 30%',
                display: 'flex',
                flexDirection: 'column',
                p: 2, // padding
                bgcolor: 'background.paper'
              }}
      >
               <Typography variant="h6" gutterBottom>
                       Saved Rules
               </Typography>
               {savedModules.map((rule) => (
                         <div
                           key={rule.id}
                           style={{
                             padding: '12px',
                             border: '1px solid #e0e0e0',
                             borderRadius: '4px',
                             display: 'flex',
                             alignItems: 'center',
                             backgroundColor: selectedCodes.includes(rule.code) ? '#f0f8ff' : 'white'
                           }}
                         >
                           <input
                             type="checkbox"
                             id={`rule-${rule.id}`}
                             checked={selectedCodes.includes(rule.code)}
                             onChange={() => handleCheckboxChange(rule)}
                             style={{ marginRight: '12px', cursor: 'pointer' }}
                           />
                           <label
                             htmlFor={`rule-${rule.id}`}
                             style={{ flexGrow: 1, cursor: 'pointer' }}
                           >
                             {rule.name}
                           </label>
                         </div>
                       ))}
            </Container>
    </div>
  );
}

export default ExecutionPage;