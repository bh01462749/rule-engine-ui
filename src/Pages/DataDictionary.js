import './DataDictionary.css';
import { useState } from 'react';
import {
  TextField,
  Tabs,
  Tab,
  Box,
  Button
} from '@mui/material';
import { sampleTransaction, featureNames } from '../Services/api';

function DataDictionary() {
  const [activeTab, setActiveTab] = useState('verbs');
  const [editData, setEditData] = useState({
    verbs: JSON.stringify(featureNames, null, 2),
    transaction: JSON.stringify(sampleTransaction, null, 2),
    features: JSON.stringify(featureNames, null, 2)
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditChange = (e) => {
    setEditData(prev => ({
      ...prev,
      [activeTab]: e.target.value
    }));
  };

  const handleSave = () => {
    try {
      // Validate JSON before saving
      JSON.parse(editData[activeTab]);
      // In a real app, you would save to API/local storage here
      setIsEditing(false);
      alert(`${activeTab} saved successfully!`);
    } catch (error) {
      alert(`Invalid JSON: ${error.message}`);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const getTabContent = () => {
    switch(activeTab) {
      case 'verbs':
        return editData.verbs;
      case 'transaction':
        return editData.transaction;
      case 'features':
        return editData.features;
      default:
        return '';
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '90vh' }}>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Verbs" value="verbs" />
          <Tab label="Transaction Payload" value="transaction" />
          <Tab label="Features" value="features" />
        </Tabs>

        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 'calc(100% - 48px)' }}>
          <TextField
            fullWidth
            multiline
            rows={20}
            value={getTabContent()}
            onChange={handleEditChange}
            variant="outlined"
            disabled={!isEditing}
            sx={{ flexGrow: 1, mb: 2 }}
            InputProps={{
              style: {
                fontFamily: 'monospace',
                fontSize: '0.875rem'
              }
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            {isEditing ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  color="primary"
                >
                  Save
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={handleEditToggle}
                color="primary"
              >
                Edit
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DataDictionary;