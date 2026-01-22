import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Creators from './pages/Creators';
import About from './pages/About';
import Profile from './pages/Profile';
import Collection from './pages/Collection';
import { DataProvider } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ScrollToTop from './components/ScrollToTop';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/collection/:id" element={<Collection />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <div className="app">
            <Header />
            <main>
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </DataProvider>
  );
}

export default App;
