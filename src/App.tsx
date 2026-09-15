import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import CartFly from './components/CartFly';
import Navbar from './components/Navbar';
import PageLoader from './components/PageLoader';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import ExperiencePage from './pages/ExperiencePage';
import LocationsPage from './pages/LocationsPage';
import AboutPage from './pages/AboutPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('enter');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('exit');
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === 'exit') {
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('enter');
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [transitionStage, location]);

  return (
    <div
      className={`transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        transitionStage === 'exit'
          ? 'opacity-0 translate-y-3'
          : 'opacity-100 translate-y-0'
      }`}
    >
      <Routes location={displayLocation}>
        {children}
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <PageLoader key="page-loader" />
        <ScrollToTop />
        <PageTransition>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </PageTransition>
        <Navbar />
        <Cart />
        <CartFly />
      </BrowserRouter>
    </CartProvider>
  );
}
