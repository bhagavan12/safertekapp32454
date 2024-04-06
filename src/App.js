import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Comp from './components/comp1';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Comp />} />
      </Routes>
    </Router>
  );
};

export default App;
