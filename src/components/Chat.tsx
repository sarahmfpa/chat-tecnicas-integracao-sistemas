import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Chat = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite sua mensagem..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default Chat;