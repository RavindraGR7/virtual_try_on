import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Heart, Search, Shirt, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll for header transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white shadow-md text-gray-800" 
            : "bg-transparent text-white"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Shirt className="w-8 h-8" strokeWidth={1.5} />
            <span className="text-xl font-bold">Global Attire</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/" label="Home" isActive={location.pathname === '/'} />
            <NavLink href="/try-on" label="Virtual Try-On" isActive={location.pathname === '/try-on'} />
            <NavLink href="/size-guide" label="Size Guide" isActive={location.pathname === '/size-guide'} />
            <NavLink href="/shop" label="Shop" isActive={location.pathname.startsWith('/shop')} />
            <NavLink href="/community" label="Community" isActive={location.pathname === '/community'} />
          </nav>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button aria-label="Search" className="focus:outline-none hover:text-primary-500 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/favorites" aria-label="Favorites" className="focus:outline-none hover:text-primary-500 transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/profile/me" aria-label="Profile" className="focus:outline-none hover:text-primary-500 transition-colors">
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg text-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <MobileNavLink href="/" label="Home" />
                <MobileNavLink href="/try-on" label="Virtual Try-On" />
                <MobileNavLink href="/size-guide" label="Size Guide" />
                <MobileNavLink href="/shop" label="Shop" />
                <MobileNavLink href="/community" label="Community" />
                <MobileNavLink href="/favorites" label="Favorites" />
                <MobileNavLink href="/profile/me" label="Profile" />
              </nav>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Global Attire</h3>
              <p className="text-gray-300">
                Bringing traditional clothing from around the world to immigrants in the United States.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
                <li><Link to="/try-on" className="text-gray-300 hover:text-white transition">Virtual Try-On</Link></li>
                <li><Link to="/size-guide" className="text-gray-300 hover:text-white transition">Size Guide</Link></li>
                <li><Link to="/shop" className="text-gray-300 hover:text-white transition">Shop</Link></li>
                <li><Link to="/community" className="text-gray-300 hover:text-white transition">Community</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-300 hover:text-white transition">FAQ</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white transition">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-300 hover:text-white transition">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className="text-gray-300 mb-4">Stay updated with our latest collections and features.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 w-full text-gray-800 rounded-l-md focus:outline-none"
                />
                <button 
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-r-md transition"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Global Attire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Navigation link component for desktop
const NavLink = ({ href, label, isActive }: { href: string; label: string; isActive: boolean }) => (
  <Link 
    to={href} 
    className={cn(
      "text-base font-medium hover:text-primary-500 transition-colors relative py-1",
      isActive && "font-semibold"
    )}
  >
    {label}
    {isActive && (
      <motion.span
        layoutId="navunderline"
        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    )}
  </Link>
);

// Navigation link component for mobile
const MobileNavLink = ({ href, label }: { href: string; label: string }) => (
  <Link 
    to={href} 
    className="text-lg font-medium py-2 hover:text-primary-500 transition-colors"
  >
    {label}
  </Link>
);

export default MainLayout;