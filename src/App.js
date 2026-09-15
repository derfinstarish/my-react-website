import React, { useState } from 'react';
import './App.css';
import Portfolio from './portfolio.js';
import ConsultationPage from './ConsultationPage';

function App() {
  const [showConsultation, setShowConsultation] = useState(false);

  const handleOpenConsultation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowConsultation(true);
  };

  return (
    <div className="App">
      <Portfolio onOpenConsultation={handleOpenConsultation} />
      {showConsultation && (
        <ConsultationPage onBack={() => setShowConsultation(false)} isModal />
      )}
    </div>
  );
}

export default App;
