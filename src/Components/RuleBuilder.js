import React, { useState } from 'react';
import IfBlock from './IfBlock';

function RuleBuilder() {
  const [ifBlocks, setIfBlocks] = useState([
    {
      id: Date.now(),
      conditions: [],
      actions: [],
      children: []
    }
  ]);

  const updateBlock = (index, updated) => {
    const blocks = [...ifBlocks];
    blocks[index] = updated;
    setIfBlocks(blocks);
  };

  const deleteBlock = (index) => {
    const blocks = [...ifBlocks];
    blocks.splice(index, 1);
    setIfBlocks(blocks);
  };

  const addTopLevelIf = () => {
    setIfBlocks([
      ...ifBlocks,
      {
        id: Date.now(),
        conditions: [],
        actions: [],
        children: []
      }
    ]);
  };

  const generateJSCode = (block, indent = 0) => {
    const space = '  '.repeat(indent);
    const conditionStr = block.conditions
      .map((item) =>
        item.type === 'condition'
          ? `${item.field} ${item.operator} ${JSON.stringify(item.value)}`
          : item.value
      )
      .join(' ');

    const actionStr = block.actions
      .map(
        (act) =>
          `${act.functionName}(${act.params.map((p) => JSON.stringify(p)).join(', ')})`
      )
      .join(`\n${space}  `);

    const childrenStr = block.children
      .map((child) => generateJSCode(child, indent + 1))
      .join('\n');

    return `${space}if (${conditionStr}) {\n${space}  ${actionStr}\n${childrenStr}\n${space}}`;
  };

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '40px',
      padding: '20px'
    }}>
      <div style={{ flex: '1 1 400px' }}>
        <h2>🛠 Rule Builder</h2>
        {ifBlocks.map((block, idx) => (
          <IfBlock
            key={block.id}
            block={block}
            onUpdate={(updated) => updateBlock(idx, updated)}
            onDelete={() => deleteBlock(idx)}
          />
        ))}
        <button className="btn btn-secondary" onClick={addTopLevelIf}>
          ➕ Add Top-Level IF
        </button>
      </div>
      <div style={{ flex: '1 1 400px' }}>
        <h2>Generated Code</h2>
        <pre>{ifBlocks.map(generateJSCode).join('\n\n')}</pre>
      </div>
    </div>
  );
}

export default RuleBuilder;
