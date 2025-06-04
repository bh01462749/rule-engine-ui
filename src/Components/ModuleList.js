import React from 'react';
import { List, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function ModuleList({ modules, activeModule, onSelect, onDelete }) {
  return (
    <div className="module-list">
      <List
        dataSource={modules}
        renderItem={(module) => (
          <List.Item
            className={`module-item ${activeModule === module.id ? 'active' : ''}`}
            onClick={() => onSelect(module.id)}
          >
            <div className="module-info">
              <span className="module-name">{module.name}</span>
              <span className="module-date">
                {new Date(module.lastUpdated).toLocaleDateString()}
              </span>
            </div>

            <Popconfirm
              title="Are you sure to delete this module?"
              onConfirm={(e) => {
                e.stopPropagation();
                onDelete(module.id);
              }}
              onCancel={(e) => e.stopPropagation()}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={(e) => e.stopPropagation()}
                className="delete-button"
              />
            </Popconfirm>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ModuleList;