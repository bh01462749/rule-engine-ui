import React, { useState } from 'react';
import { Input, Button, List, Avatar } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRef, useEffect } from 'react';

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your coding assistant. How can I help you with your JavaScript code?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  


  
const fetchData = async () => {
  try {
   const res = await axios.get('https://rules-master-backend-fgekhthad7ajeuda.southeastasia-01.azurewebsites.net/api/openai/ask', {
  params: { prompt: inputValue }
      });
      console.log(res.data)
    // assuming the response is a plain string
    const botMessage = {
      sender: 'bot',
      text: res.data,
    };
    console.log(botMessage)

setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching data:', error);
      const botMessage = {
  sender: 'bot',
  text: "Error fetching data",
};
console.log(botMessage)
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    await fetchData();
    
  
  

    
    setIsLoading(false);
  };
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-bot">
      <div className="chat-header">
        <h3>Coding Assistant</h3>
      </div>

      <div className="chat-messages" style={{ overflowY: 'auto', maxHeight: '400px' }}>
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
        <div ref={bottomRef} />
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