import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about";
import Contact from "./pages/contact";
import PredictorForm from "./pages/Predict";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ import your Register page

function App() {
  return (
    <Router>
      <Routes>
  {/* <Route path="/" element={<Login />} /> */}
  <Route path="/login" element={<Login />} /> {/* Add this line */}
  <Route path="/register" element={<Register />} /> {/* And this too */}
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
