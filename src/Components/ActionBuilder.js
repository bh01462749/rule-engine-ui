// src/components/ActionBuilder.js
import React from 'react';

const predefinedFunctions = {
  sendEmail: ['recipient', 'subject'],
  showAlert: ['message'],
  logToConsole: ['message']
};

const predefinedValues = {
  recipient: ['user@example.com', 'admin@example.com'],
  subject: ['Welcome!', 'Important Update'],
  message: ['Hello!', 'An error occurred.']
};

function ActionBuilder({ actions, onChange }) {
  const addAction = () => {
    onChange([...actions, { functionName: '', params: [] }]);
  };

  const updateActionFunction = (index, functionName) => {
    const params = predefinedFunctions[functionName] || [];
    const updated = [...actions];
    updated[index] = { functionName, params: params.map(() => '') };
    onChange(updated);
  };

  const updateParam = (actionIndex, paramIndex, value) => {
    const updated = [...actions];
    updated[actionIndex].params[paramIndex] = value;
    onChange(updated);
  };

  const deleteAction = (index) => {
    const updated = [...actions];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div>
      {actions.map((action, index) => {
        const paramKeys = predefinedFunctions[action.functionName] || [];
        return (
          <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <select
              value={action.functionName}
              onChange={(e) => updateActionFunction(index, e.target.value)}
              style={{ marginRight: '10px' }}
            >
              <option value="">Select Action</option>
              {Object.keys(predefinedFunctions).map(func => (
                <option key={func} value={func}>{func}</option>
              ))}
            </select>
            {paramKeys.map((param, pIdx) => (
              <select
                key={pIdx}
                value={action.params[pIdx] || ''}
                onChange={(e) => updateParam(index, pIdx, e.target.value)}
              >
                <option value="">{param}</option>
                {predefinedValues[param].map(val => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            ))}
            <span
              onClick={() => deleteAction(index)}
              style={{ cursor: 'pointer', color: 'red' }}
              title="Delete Action"
            >
              🗑
            </span>
          </div>
        );
      })}
      <button className="btn btn-primary" onClick={addAction}>
        Add Action
      </button>
    </div>
  );
}

export default ActionBuilder;
