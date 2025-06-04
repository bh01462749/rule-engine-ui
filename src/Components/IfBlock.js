// src/components/IfBlock.js
import React from 'react';
import ConditionBuilder from './ConditionBuilder';
import ActionBuilder from './ActionBuilder';

function IfBlock({ block, onUpdate, onDelete }) {
  const updateConditions = (updated) => {
    onUpdate({ ...block, conditions: updated });
  };

  const updateActions = (updated) => {
    onUpdate({ ...block, actions: updated });
  };

  const addChild = () => {
    const child = {
      id: Date.now(),
      conditions: [],
      actions: [],
      children: []
    };
    onUpdate({ ...block, children: [...block.children, child] });
  };

  const updateChild = (idx, child) => {
    const updated = [...block.children];
    updated[idx] = child;
    onUpdate({ ...block, children: updated });
  };

  const deleteChild = (idx) => {
    const updated = [...block.children];
    updated.splice(idx, 1);
    onUpdate({ ...block, children: updated });
  };

  return (
    <div
      style={{
        border: '2px solid #e0e0e0',
        padding: '20px',
        marginBottom: '20px',
        marginTop: '20px',
        borderRadius: '8px',
        backgroundColor: '#fdfdfd',
        position: 'relative',
      }}
    >
      {/* Delete IF block icon */}
      {onDelete && (
        <span
          onClick={onDelete}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            color: '#d9534f',
            fontSize: '18px',
          }}
          title="Delete IF Block"
        >
          ❌
        </span>
      )}

      <h3>IF Block</h3>

      <ConditionBuilder conditions={block.conditions} onChange={updateConditions} />

      <h4>Actions:</h4>
      <ActionBuilder actions={block.actions} onChange={updateActions} />

      <div className="button-group" style={{ marginTop: '10px' }}>
        <button className="btn btn-primary" onClick={addChild}>
           Add Nested IF
        </button>
      </div>

      {block.children.map((child, idx) => (
        <IfBlock
          key={child.id}
          block={child}
          onUpdate={(updated) => updateChild(idx, updated)}
          onDelete={() => deleteChild(idx)}
        />
      ))}
    </div>
  );
}

export default IfBlock;
