import React, { useEffect } from 'react';
import './App.css';

function App() {

  useEffect (() => {
    document.title = "50 Projects"
  });

  return (
    <div className="container">
      <a href='50projects/test'>testing</a>
    </div>
  );
}

export default App;
