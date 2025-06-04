// src/components/ConditionBuilder.js
import React from 'react';

function ConditionBuilder({ conditions, onChange }) {
  const updateCondition = (index, key, value) => {
    const updated = [...conditions];
    updated[index][key] = value;
    onChange(updated);
  };

  const addCondition = () => {
    const updated = [...conditions];
    if (updated.length > 0) {
      // Add a logic operator *before* the new condition
      updated.push({ type: 'logic', value: '&&' });
    }
    updated.push({ type: 'condition', field: '', operator: '===', value: '' });
    onChange(updated);
  };

  const deleteCondition = (index) => {
    const updated = [...conditions];

    if (index > 0 && updated[index - 1].type === 'logic') {
      // Remove the logic operator before this condition
      updated.splice(index - 1, 2);
    } else {
      // Just remove the condition (and logic after if exists)
      updated.splice(index, 2);
    }

    onChange(updated);
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      {conditions.map((item, idx) => {
        if (item.type === 'logic') {
          return (
            <div key={idx} className="condition-row">
              <label>Logic:</label>
              <select
                value={item.value}
                onChange={(e) => updateCondition(idx, 'value', e.target.value)}
              >
                <option value="&&">AND</option>
                <option value="||">OR</option>
              </select>
            </div>
          );
        }

        return (
          <div key={idx} className="condition-row">
            <label>Field:</label>
            <input
              style={{ width: '100px' }}
              value={item.field}
              onChange={(e) => updateCondition(idx, 'field', e.target.value)}
            />
            <label>Operator:</label>
            <select
              value={item.operator}
              onChange={(e) => updateCondition(idx, 'operator', e.target.value)}
            >
              <option value="===">===</option>
              <option value="!==">!==</option>
              <option value=">">{'>'}</option>
              <option value="<">{'<'}</option>
            </select>
            <label>Value:</label>
            <input
              style={{ width: '100px' }}
              value={item.value}
              onChange={(e) => updateCondition(idx, 'value', e.target.value)}
            />
            <span
              className="delete-icon"
              title="Delete condition"
              onClick={() => deleteCondition(idx)}
            >
              🗑
            </span>
          </div>
        );
      })}

      <button className="btn btn-primary" onClick={addCondition} style={{ marginTop: '10px' }}>
        Add Condition
      </button>
    </div>
  );
}

export default ConditionBuilder;
