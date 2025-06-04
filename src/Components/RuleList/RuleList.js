import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './RuleList.css';

const RuleList = ({ rules, onRemoveRule }) => {
  return (
    <Box className="rule-list">
      <Typography variant="h6" gutterBottom>
        Current Rules ({rules.length})
      </Typography>
      {rules.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No rules added yet
        </Typography>
      ) : (
        <List dense>
          {rules.map((rule, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => onRemoveRule(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`Rule ${index + 1}`}
                secondary={rule.split('\n')[0].replace(/\/\/\s?/, '')}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default RuleList;