import React, { useState } from 'react';
import { Input, Button, List, Avatar } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your coding assistant. How can I help you with your JavaScript code?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I am analyzing your code question...",
        "Here is what I found about that error...",
        "You might want to check the syntax on line 5.",
        "That is a common issue. Try using console.log() to debug.",
        "I recommend checking the documentation for that function.",
      ];

      const botMessage = {
        sender: 'bot',
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="chat-bot">
      <div className="chat-header">
        <h3>Coding Assistant</h3>
      </div>

      <div className="chat-messages">
        <List
          dataSource={messages}
          renderItem={(msg) => (
            <List.Item className={`message ${msg.sender}`}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={msg.sender === 'user' ? <UserOutlined /> : <RobotOutlined />}
                    style={{ backgroundColor: msg.sender === 'user' ? '#1890ff' : '#52c41a' }}
                  />
                }
                title={msg.sender === 'user' ? 'You' : 'Assistant'}
                description={msg.text}
              />
            </List.Item>
          )}
        />
      </div>

      <div className="chat-input">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="Ask a question about your code..."
          disabled={isLoading}
        />
        <Button
          type="primary"
          onClick={handleSendMessage}
          loading={isLoading}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default ChatBot;