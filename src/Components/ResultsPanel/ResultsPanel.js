import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import './ResultsPanel.css';

const ResultsPanel = ({ results }) => {
  if (!results) return null;

  return (
    <Box className="results-panel">
      <Typography variant="h6" gutterBottom>
        Evaluation Results
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {results.approved ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon color="error" />
            )}
            <Typography variant="h6">
              {results.finalDecision}
            </Typography>
            <Chip
              label={results.approved ? 'APPROVED' : 'DECLINED'}
              color={results.approved ? 'success' : 'error'}
              sx={{ ml: 'auto' }}
            />
          </Box>
        </CardContent>
      </Card>

      <Typography variant="subtitle1" gutterBottom>
        Rules Fired ({results.firedRules.length})
      </Typography>

      <List>
        {results.firedRules.map((rule, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{ mb: 2, borderLeft: `4px solid ${rule.result ? '#4caf50' : '#f44336'}` }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                  Rule {index + 1}
                </Typography>
                <Chip
                  label={rule.result ? 'PASSED' : 'FAILED'}
                  size="small"
                  color={rule.result ? 'success' : 'error'}
                />
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {rule.reason}
              </Typography>
              <pre className="rule-code">
                {rule.rule}
              </pre>
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
  );
};

export default ResultsPanel;