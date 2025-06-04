import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shirt, Ruler, Users, ShoppingBag } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img 
            src="https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg" 
            alt="Traditional clothing showcase" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Experience Your Cultural Heritage in America
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Virtual try-on for traditional clothing from around the world, 
              with accurate sizing for the perfect fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/try-on"
                className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-8 rounded-md font-medium text-lg transition duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <Shirt className="mr-2 h-5 w-5" />
                Try On Now
              </Link>
              <Link 
                to="/shop"
                className="bg-white hover:bg-gray-100 text-primary-800 py-3 px-8 rounded-md font-medium text-lg transition duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Browse Collection
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <span className="sr-only">Scroll down</span>
          <svg className="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v10.586l-3.293-3.293a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414L11 14.586V4a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Global Attire helps you connect with your cultural heritage through fashion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<Shirt className="w-10 h-10 text-primary-500" />}
              title="Virtual Try-On"
              description="Experience how traditional clothing looks on you with our advanced try-on technology."
              linkTo="/try-on"
            />
            
            <FeatureCard 
              icon={<Ruler className="w-10 h-10 text-primary-500" />}
              title="Size Conversion"
              description="Find your perfect fit with our size guide that translates between regional sizing systems."
              linkTo="/size-guide"
            />
            
            <FeatureCard 
              icon={<Users className="w-10 h-10 text-primary-500" />}
              title="Community Sharing"
              description="Connect with others, share your styles, and get inspired by diverse fashion expressions."
              linkTo="/community"
            />

            <FeatureCard 
              icon={<ShoppingBag className="w-10 h-10 text-primary-500" />}
              title="Curated Marketplace"
              description="Shop authentic traditional clothing from trusted sellers around the world."
              linkTo="/shop"
            />
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Explore Traditional Clothing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover authentic clothing from cultures around the world
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CategoryCard 
              image="https://images.pexels.com/photos/2531734/pexels-photo-2531734.jpeg"
              title="South Asian"
              description="Sarees, Kurtas, Lehengas & more"
              region="South Asia"
            />
            
            <CategoryCard 
              image="https://images.pexels.com/photos/13727829/pexels-photo-13727829.jpeg"
              title="West African"
              description="Agbada, Dashiki, Kente & more"
              region="West Africa"
            />
            
            <CategoryCard 
              image="https://images.pexels.com/photos/5706736/pexels-photo-5706736.jpeg"
              title="East Asian"
              description="Kimono, Hanfu, Cheongsam & more"
              region="East Asia"
            />
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/shop" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              View all categories
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to try on traditional clothing?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience the beauty of cultural fashion with our virtual try-on technology.
            No more guessing if it will fit or look good on you!
          </p>
          <Link 
            to="/try-on" 
            className="bg-white text-primary-600 hover:bg-gray-100 py-3 px-8 rounded-md font-medium text-lg transition duration-300 inline-block"
          >
            Start Virtual Try-On
          </Link>
        </div>
      </section>

      {/* Testimonials (can be added in the future) */}
      
    </div>
  );
};

const FeatureCard = ({ icon, title, description, linkTo }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  linkTo: string;
}) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
  >
    <div className="mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link to={linkTo} className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
      Learn more
      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </motion.div>
);

const CategoryCard = ({ image, title, description, region }: {
  image: string;
  title: string;
  description: string;
  region: string;
}) => (
  <Link to={`/shop?region=${region}`}>
    <motion.div 
      whileHover={{ scale: 1.03 }}
      className="relative rounded-xl overflow-hidden group h-80"
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-200">{description}</p>
      </div>
    </motion.div>
  </Link>
);

export default Home;