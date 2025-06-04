import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import VirtualTryOn from './pages/VirtualTryOn';
import SizeGuide from './pages/SizeGuide';
import Shop from './pages/Shop';
import Community from './pages/Community';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="try-on" element={<VirtualTryOn />} />
          <Route path="size-guide" element={<SizeGuide />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:productId" element={<ProductDetail />} />
          <Route path="community" element={<Community />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;