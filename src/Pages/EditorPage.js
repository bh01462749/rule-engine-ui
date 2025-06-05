import React, { useState, useEffect } from 'react';
import CodeEditor from './../Components/CodeEditor';
import ModuleList from './../Components/ModuleList';
import ChatBot from './../Components/ChatBot';
import './../App.css';

function EditorPage() {
  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  // Add this state to the App component
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');

  // Modify the addNewModule function
  const addNewModule = () => {
    setShowAddDialog(true);
  };

  const confirmAddModule = () => {
    if (!newModuleName.trim()) {
      alert('Module name cannot be empty');
      return;
    }

    const newModule = {
      id: Date.now(),
      name: newModuleName,
      code: '// Write your code here',
      lastUpdated: new Date().toISOString()
    };

    setModules([...modules, newModule]);
    setActiveModule(newModule.id);
    saveModules([...modules, newModule]);
    setShowAddDialog(false);
    setNewModuleName('');
  };

  useEffect(() => {
    // Load saved modules from localStorage
    const savedModules = JSON.parse(localStorage.getItem('codeModules')) || [];
    setModules(savedModules);

    if (savedModules.length > 0 && !activeModule) {
      setActiveModule(savedModules[0].id);
    }
  }, [activeModule]);

  const updateModuleCode = (id, newCode) => {
    const updatedModules = modules.map(module =>
      module.id === id ? { ...module, code: newCode, lastUpdated: new Date().toISOString() } : module
    );

    setModules(updatedModules);
    saveModules(updatedModules);
  };

  const saveModules = (modulesToSave) => {
    localStorage.setItem('codeModules', JSON.stringify(modulesToSave));
  };

  const deleteModule = (id) => {
    const updatedModules = modules.filter(module => module.id !== id);
    setModules(updatedModules);
    saveModules(updatedModules);

    if (activeModule === id) {
      setActiveModule(updatedModules.length > 0 ? updatedModules[0].id : null);
    }
  };

  return (
    <div className="app1">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Code Modules</h2>
          <button onClick={addNewModule} className="add-button">
            + Add Rule
          </button>
        </div>
        <ModuleList
          modules={modules}
          activeModule={activeModule}
          onSelect={setActiveModule}
          onDelete={deleteModule}
        />
      </div>

      <div className="main-content">
        {activeModule ? (
          <CodeEditor
            module={modules.find(m => m.id === activeModule)}
            onCodeChange={updateModuleCode}
          />
        ) : (
          <div className="empty-state">
            <p>No rule selected. Create a new rule or select an existing one.</p>
          </div>
        )}
      </div>

      <button
        className={`chat-toggle ${isChatOpen ? 'open' : ''}`}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? 'Close Chat' : 'Open Chat'}
      </button>

      {isChatOpen && (
        <div className="chat-container">
          <ChatBot />
        </div>
      )}
      {showAddDialog && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Create New Rule</h3>
                <input
                  type="text"
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  placeholder="Enter rule name"
                  autoFocus
                />
                <div className="modal-actions">
                  <button onClick={() => setShowAddDialog(false)}>Cancel</button>
                  <button onClick={confirmAddModule}>Create</button>
                </div>
              </div>
            </div>
          )}
    </div>

  );
}

export default EditorPage;