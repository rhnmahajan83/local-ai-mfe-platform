// ./packages/host-app/src/App.jsx
import React, { Suspense } from 'react';

// Load dynamically across application micro frontend boundaries
const RemoteChatWindow = React.lazy(() => import('ai_chat_mfe/ChatWindow'));

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2>🏢 Main Enterprise Host Layout Portal</h2>
        <p>This panel simulates your overarching production framework.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 450px', gap: '2rem' }}>
        <div>
          <h3>Core System Configurations</h3>
          <p>Standard dashboard metrics and internal system operations would render here.</p>
        </div>
        
        <div>
          <Suspense fallback={<div style={{ fontStyle: 'italic' }}>Mounting Micro Frontend module components...</div>}>
            <RemoteChatWindow />
          </Suspense>
        </div>
      </div>
    </div>
  );
}