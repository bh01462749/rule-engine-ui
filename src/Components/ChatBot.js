import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, List, Avatar } from 'antd';
import { UserOutlined, RobotOutlined, CopyOutlined } from '@ant-design/icons';
import axios from 'axios';

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
      const botMessage = {
        sender: 'bot',
        text: res.data,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching data:', error);
      const botMessage = {
        sender: 'bot',
        text: "Error fetching data",
      };
      setMessages(prev => [...prev, botMessage]);
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

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => alert("Code copied to clipboard!"))
      .catch(err => console.error("Failed to copy text: ", err));
  };

  // Function to render message content with markdown-like formatting
  const renderMessageContent = (msgText) => {
    // Regular expression to match code blocks surrounded by triple backticks
    const codePattern = /```([^`]+)```/g;
    const matches = [...msgText.matchAll(codePattern)];

    // Replace newlines with <br /> for extra spacing
    msgText = msgText.replace(/\n\n/g, '<br /><br />');

    // Handle headings (## for H2, ### for H3)
    msgText = msgText.replace(/^## (.+)$/gm, '<h2>$1</h2>');  // H2 heading
    msgText = msgText.replace(/^### (.+)$/gm, '<h3>$1</h3>');  // H3 heading

    // Handle bold and italic formatting
    msgText = msgText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');  // Bold
    msgText = msgText.replace(/\*(.*?)\*/g, '<em>$1</em>');  // Italic

    // If there are code blocks in the message
    if (matches.length > 0) {
      let parts = [];
      let lastIndex = 0;

      // Iterate over all matches and split the text into regular text and code blocks
      matches.forEach((match, index) => {
        const code = match[1];
        const beforeCode = msgText.slice(lastIndex, match.index);
        lastIndex = match.index + match[0].length;

        if (beforeCode) {
          // Render normal text before the code block
          parts.push(<span key={`text-before-${index}`} dangerouslySetInnerHTML={{ __html: beforeCode }} />);
        }

        // Render code block with a Copy button
        parts.push(
          <div key={`code-block-${index}`} className="code-block">
            <pre>
              <code>{code}</code>
            </pre>
            <Button
              icon={<CopyOutlined />}
              size="small"
              style={{ marginTop: 10 }}
              onClick={() => handleCopy(code)}
            >
              Copy Code
            </Button>
          </div>
        );
      });

      // Add any remaining text after the last code block
      if (lastIndex < msgText.length) {
        parts.push(<span key="text-after" dangerouslySetInnerHTML={{ __html: msgText.slice(lastIndex) }} />);
      }

      return <div>{parts}</div>;
    }

    // If no code block, simply return the plain text with HTML formatting
    return <span dangerouslySetInnerHTML={{ __html: msgText }} />;
  };

  return (
    <div className="chat-bot">
      <div className="chat-header">
        <h3>Coding Assistant</h3>
      </div>

      <div className="chat-messages" style={{ overflowY: 'auto', maxHeight: '600px' }}>
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
                description={renderMessageContent(msg.text)}
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
