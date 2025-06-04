import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import './RuleList.css';

const RuleList = ({ rules, onRemoveRule }) => {
  return (
    <Box className="rule-list"
        sx={{
            pt: 3
        }}
    >
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
              sx= {{
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => onRemoveRule(index)}
                >

                </IconButton>
              }
            >
              <ListItemText
                primary={rule}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default RuleList;