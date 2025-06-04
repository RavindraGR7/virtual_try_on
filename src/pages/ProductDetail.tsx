import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Shirt, Share2, ArrowLeft } from 'lucide-react';
import { useStore } from '../store';
import { ClothingItem } from '../types';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { clothingItems, favorites, toggleFavorite } = useStore();
  const [product, setProduct] = useState<ClothingItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  
  useEffect(() => {
    if (productId) {
      const foundProduct = clothingItems.find(item => item.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        // Set defaults if available
        if (foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
        if (foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0].usEquivalent);
        }
      }
    }
  }, [productId, clothingItems]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-primary-500 hover:underline">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(product.id);

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="container mx-auto px-4 py-12">
        <Link to="/shop" className="inline-flex items-center text-gray-600 hover:text-primary-500 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Shop
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>
                  <p className="text-gray-600 mb-4">Origin: {product.origin}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="text-gray-400 hover:text-primary-500 transition"
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className="w-6 h-6" fill={isFavorite ? '#7928CA' : 'none'} />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-3xl font-bold text-primary-600">${product.price.toFixed(2)}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Color</h2>
                  <div className="flex space-x-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                          selectedColor === color 
                            ? 'ring-2 ring-offset-2 ring-primary-500 transform scale-110' 
                            : ''
                        }`}
                        aria-label={`Select ${color} color`}
                      >
                        <span 
                          className="w-8 h-8 rounded-full border border-gray-200"
                          style={{ 
                            backgroundColor: color.toLowerCase() === 'white' 
                              ? 'white' 
                              : color.toLowerCase() === 'gold'
                                ? '#FFD700'
                                : color.toLowerCase() 
                          }}
                        ></span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold">Size (US)</h2>
                    <Link to="/size-guide" className="text-primary-500 text-sm hover:underline">
                      Size Guide
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size.usEquivalent)}
                        className={`border rounded-md py-2 font-medium transition ${
                          selectedSize === size.usEquivalent
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {size.usEquivalent} ({size.value})
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600 flex items-start">
                    <span className="text-primary-500 font-bold mr-2">•</span>
                    <p>
                      Regional size {product.sizes.find(s => s.usEquivalent === selectedSize)?.value || ''}
                      {' '}corresponds to US size {selectedSize}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <a 
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-secondary-400 hover:bg-secondary-500 text-white py-3 rounded-md font-medium transition flex items-center justify-center"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Now
                </a>
                
                <Link
                  to={`/try-on?item=${product.id}`}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-md font-medium transition flex items-center justify-center"
                >
                  <Shirt className="w-5 h-5 mr-2" />
                  Virtual Try-On
                </Link>
              </div>
              
              {/* Share */}
              <button 
                className="mt-6 text-gray-500 hover:text-primary-500 transition flex items-center"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share this item
              </button>
            </div>
          </div>
        </div>
        
        {/* Product Details/Specifications */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Product Specifications</h2>
          </div>
          
          <div className="p-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-gray-900">{product.category}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Origin</dt>
                <dd className="mt-1 text-gray-900">{product.origin}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Available Colors</dt>
                <dd className="mt-1 text-gray-900">{product.colors.join(', ')}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Available Sizes</dt>
                <dd className="mt-1 text-gray-900">
                  {product.sizes.map(size => `${size.value} (US ${size.usEquivalent})`).join(', ')}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        {/* Care Instructions */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Care Instructions</h2>
          </div>
          
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              To ensure the longevity and beauty of your {product.name}, please follow these care instructions:
            </p>
            
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Dry clean only for delicate fabrics and embroidery</li>
              <li>Hand wash using mild detergent in cold water for cotton items</li>
              <li>Always air dry flat in shade</li>
              <li>Store in a cool, dry place away from direct sunlight</li>
              <li>Iron on low heat if necessary</li>
              <li>For heavily embellished items, store separately to avoid snagging</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;