// ./packages/ai-chat-feature/src/bootstrap.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatWindow from './components/ChatWindow';

const root = createRoot(document.getElementById('root'));
root.render(<div style={{padding: '20px'}}><ChatWindow /></div>);