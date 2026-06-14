// ./packages/ai-chat-feature/src/components/ChatWindow.jsx
import React, { useState } from 'react';

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'error', text: 'Error connecting to local RAG backend.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '2px solid #4A90E2', padding: '1.5rem', borderRadius: '12px', maxWidth: '450px', fontFamily: 'sans-serif' }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>🧠 Local AI Copilot</h3>
      <div style={{ height: '250px', overflowY: 'auto', border: '1px solid #eee', padding: '0.5rem', marginBottom: '1rem', background: '#fafafa', borderRadius: '6px' }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '8px 0' }}>
            <span style={{ background: m.role === 'user' ? '#DTVFFF' : m.role === 'error' ? '#FFD2D2' : '#E2E2E2', padding: '6px 10px', borderRadius: '8px', display: 'inline-block', fontSize: '14px' }}>
              {m.text}
            </span>
          </div>
        ))}
        {loading && <p style={{ fontSize: '12px', color: '#888' }}>Thinking...</p>}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input style={{ flexGrow: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask your data..." onKeyDown={(e) => e.key === 'Enter' && handleSend()}/>
        <button style={{ padding: '8px 16px', background: '#4A90E2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}