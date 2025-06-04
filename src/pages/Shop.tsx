import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { useLocation, Link } from 'react-router-dom';
import { Filter, Search, Heart } from 'lucide-react';
import { ClothingItem, Region, ClothingCategory } from '../types';

const Shop = () => {
  const location = useLocation();
  const { clothingItems, toggleFavorite, favorites } = useStore();
  const [filteredItems, setFilteredItems] = useState<ClothingItem[]>(clothingItems);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters
  const [selectedRegion, setSelectedRegion] = useState<Region | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<ClothingCategory | ''>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get region from URL params if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const region = params.get('region');
    if (region) {
      setSelectedRegion(region as Region);
    }
  }, [location.search]);
  
  // Apply filters whenever they change
  useEffect(() => {
    let result = clothingItems;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.origin.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply region filter
    if (selectedRegion) {
      result = result.filter(item => item.origin === selectedRegion);
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    // Apply price filter
    result = result.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    
    setFilteredItems(result);
  }, [clothingItems, searchTerm, selectedRegion, selectedCategory, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shop Traditional Clothing</h1>
          <p className="text-gray-600 mb-8 md:mb-12">
            Explore authentic traditional clothing from around the world
          </p>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for clothing..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50 transition"
              >
                <Filter size={20} />
                <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              </button>
            </div>
            
            {/* Expandable filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white border border-gray-200 rounded-lg p-6 mb-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value as Region | '')}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">All Regions</option>
                      <option value="South Asia">South Asia</option>
                      <option value="West Africa">West Africa</option>
                      <option value="East Asia">East Asia</option>
                      <option value="Southeast Asia">Southeast Asia</option>
                      <option value="Middle East">Middle East</option>
                      <option value="Europe">Europe</option>
                      <option value="Latin America">Latin America</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as ClothingCategory | '')}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">All Categories</option>
                      <option value="saree">Saree</option>
                      <option value="agbada">Agbada</option>
                      <option value="hanfu">Hanfu</option>
                      <option value="kimono">Kimono</option>
                      <option value="kurta">Kurta</option>
                      <option value="cheongsam">Cheongsam</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <div className="px-2">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => {
                      setSelectedRegion('');
                      setSelectedCategory('');
                      setPriceRange([0, 500]);
                      setSearchTerm('');
                    }}
                    className="text-gray-600 hover:text-gray-800 mr-4"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {/* Products Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <ProductCard 
                  key={item.id} 
                  item={item} 
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedRegion('');
                  setSelectedCategory('');
                  setPriceRange([0, 500]);
                  setSearchTerm('');
                }}
                className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-6 rounded-md transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ item, isFavorite, onToggleFavorite }: {
  item: ClothingItem;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
  >
    <div className="relative">
      <Link to={`/shop/${item.id}`}>
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-64 object-cover"
        />
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite();
        }}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart 
          size={20} 
          fill={isFavorite ? '#7928CA' : 'none'} 
          stroke={isFavorite ? '#7928CA' : 'currentColor'}
        />
      </button>
    </div>
    
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 truncate">
          <Link to={`/shop/${item.id}`}>{item.name}</Link>
        </h3>
        <span className="text-primary-600 font-medium">${item.price.toFixed(2)}</span>
      </div>
      
      <div className="mb-3">
        <span className="text-sm text-gray-500">{item.origin}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <Link 
          to={`/try-on?item=${item.id}`}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Try it on
        </Link>
        
        <a 
          href={item.affiliateLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-secondary-400 hover:bg-secondary-500 text-white py-1 px-3 rounded text-sm font-medium transition"
        >
          View Store
        </a>
      </div>
    </div>
  </motion.div>
);

export default Shop;