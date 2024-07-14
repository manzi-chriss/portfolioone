import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cursor from './components/Cursor';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import Underdevelopment from './components/Underdevelopment';

function App() {
  return (
    <Router>
      <div>
        <Cursor /> {/* Include the Cursor component */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Underdevelopment />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
