import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-primary-500 mb-6">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md font-medium transition"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          <Link
            to="/shop"
            className="flex items-center justify-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md font-medium transition"
          >
            <Search className="w-5 h-5 mr-2" />
            Browse Collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;