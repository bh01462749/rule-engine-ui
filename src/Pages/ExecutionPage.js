import React, { useState } from 'react';
import { Box, Container, Grid, Button, Typography, AppBar, Toolbar } from '@mui/material';
import RuleEditor from './../Components/RuleEditor/RuleEditor';
import TransactionEditor from './../Components/TransactionEditor/TransactionEditor';
import RuleList from './../Components/RuleList/RuleList';
import ResultsPanel from './../Components/ResultsPanel/ResultsPanel';
import { evaluateRules, sampleRules } from './../Services/api';
import { sampleTransaction } from './../Services/api';

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
  const [isRuleValid, setIsRuleValid] = useState(false);

  const handleAddRule = (newRule) => {
    setRules([...rules, newRule]);
  };

  const handleRemoveRule = (index) => {
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
  };

  const handleEvaluate = async () => {
    try {
    console.log(rules)
      const response = await evaluateRules(transaction, rules);
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

  const handleLoadSampleRules = () => {
    setRules(sampleRules);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Transaction Rule Engine
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <TransactionEditor
                transaction={transaction}
                setTransaction={setTransaction}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <RuleEditor
                initialValue={sampleRules[0]}
                onSave={handleAddRule}
                onValidate={setIsRuleValid}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <RuleList
                rules={rules}
                onRemoveRule={handleRemoveRule}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <ResultsPanel results={results} />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEvaluate}
            disabled={rules.length === 0}
            size="large"
          >
            Evaluate Rules
          </Button>

          <Button
            variant="outlined"
            onClick={handleLoadSampleRules}
            size="large"
          >
            Load Sample Rules
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default ExecutionPage;