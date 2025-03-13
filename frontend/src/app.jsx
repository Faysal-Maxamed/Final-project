import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Corrected import path
import About from './pages/about'; // Corrected import path
import Contact from './pages/contact'; // Ensure this file exists
import PredictorForm from "./pages/Predict"
import History from "./pages/History";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/PredictorForm" element={<PredictorForm />} />
          <Route path="/history" element={<History />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;