import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { Upload, Camera, Shirt, ArrowRight } from 'lucide-react';
import { ClothingItem } from '../types';

const VirtualTryOn = () => {
  const { clothingItems } = useStore();
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
        setCurrentStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTakePhoto = () => {
    // In a real implementation, this would access the user's camera
    // For this demo, we'll just use a placeholder image
    setUserImage("https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg");
    setCurrentStep(2);
  };

  const handleSelectItem = (item: ClothingItem) => {
    setSelectedItem(item);
    setCurrentStep(3);
  };

  const handleTryOn = () => {
    if (!selectedItem || !userImage) return;

    setIsProcessing(true);

    // In a real implementation, this would call an AI service to generate the try-on image
    // For this demo, we'll just use the model image after a delay
    setTimeout(() => {
      setTryOnResult(selectedItem.modelImageUrl);
      setIsProcessing(false);
      setCurrentStep(4);
    }, 3000);
  };

  const resetTryOn = () => {
    setUserImage(null);
    setSelectedItem(null);
    setTryOnResult(null);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Virtual Try-On Experience</h1>
          <p className="text-gray-600 text-center mb-12 text-lg">
            See how traditional clothing from around the world looks on you
          </p>

          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-16">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                {step > 1 && (
                  <div className={`flex-1 h-1 ${currentStep >= step ? 'bg-primary-500' : 'bg-gray-300'}`}></div>
                )}
                <div className={`relative ${step > 1 ? 'flex-shrink-0' : ''}`}>
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      currentStep >= step ? 'bg-primary-500' : 'bg-gray-300'
                    }`}
                  >
                    {step}
                  </div>
                  <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium">
                    {step === 1 && 'Upload Photo'}
                    {step === 2 && 'Select Clothing'}
                    {step === 3 && 'Try It On'}
                    {step === 4 && 'See Result'}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Upload Photo */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Upload Your Photo</h2>
              <p className="text-gray-600 mb-8 text-center">
                We'll use this to show how different traditional clothes look on you.
                Your photo is only used for the try-on and won't be stored permanently.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-primary-400 transition cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="font-medium text-gray-700 mb-2">Upload from device</p>
                  <p className="text-sm text-gray-500 text-center mb-4">Drag and drop or click to select</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    id="photo-upload" 
                  />
                  <label 
                    htmlFor="photo-upload" 
                    className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium transition"
                  >
                    Select Photo
                  </label>
                </div>

                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-primary-400 transition cursor-pointer"
                  onClick={handleTakePhoto}
                >
                  <Camera className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="font-medium text-gray-700 mb-2">Take a photo</p>
                  <p className="text-sm text-gray-500 text-center mb-4">Use your camera to take a new photo</p>
                  <button 
                    className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium transition"
                  >
                    Open Camera
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 mb-2">
                  For best results, use a photo where you're standing straight with your arms at your sides.
                </p>
                <p className="text-sm text-gray-500">
                  We respect your privacy. Your photo is only used locally in your browser.
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Clothing */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Select Clothing</h2>
                
                {userImage && (
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary-500">
                      <img 
                        src={userImage} 
                        alt="Your photo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="ml-3 text-primary-500 hover:text-primary-600 text-sm font-medium"
                    >
                      Change photo
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {clothingItems.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className="cursor-pointer group"
                  >
                    <div className="rounded-lg overflow-hidden mb-3 relative">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-64 object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                        <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-md text-sm font-medium transition flex items-center justify-center">
                          <Shirt className="w-4 h-4 mr-1" />
                          Try This On
                        </button>
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.origin}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Try On */}
          {currentStep === 3 && selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Ready to Try On</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src={userImage || ''} 
                    alt="Your photo" 
                    className="w-full h-96 object-cover"
                  />
                </div>
                
                <div className="flex flex-col">
                  <div className="border rounded-lg overflow-hidden mb-6">
                    <img 
                      src={selectedItem.imageUrl} 
                      alt={selectedItem.name} 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-lg mb-2">{selectedItem.name}</h3>
                    <p className="text-gray-600 mb-2">{selectedItem.description}</p>
                    <div className="text-sm text-gray-500">
                      <p>Origin: {selectedItem.origin}</p>
                      <p>Category: {selectedItem.category}</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <button
                      onClick={handleTryOn}
                      disabled={isProcessing}
                      className={`w-full ${
                        isProcessing 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-primary-500 hover:bg-primary-600'
                      } text-white py-3 rounded-md font-medium transition flex items-center justify-center`}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                            <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Try It On Now
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="w-full mt-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 py-3 rounded-md font-medium transition"
                    >
                      Choose Different Item
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && tryOnResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Your Virtual Try-On Result</h2>
              
              <div className="max-w-3xl mx-auto">
                <div className="rounded-lg overflow-hidden mb-8">
                  <img 
                    src={tryOnResult} 
                    alt="Try-on result" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                <div className="bg-primary-50 border border-primary-100 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">How does it look?</h3>
                  <p className="text-primary-700">
                    This is how {selectedItem?.name} would look on you. The virtual try-on gives you 
                    an idea of the style, but fabric texture and exact fit may vary.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {selectedItem && (
                    <a 
                      href={selectedItem.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-md font-medium transition text-center"
                    >
                      Shop This Item
                    </a>
                  )}
                  
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 py-3 rounded-md font-medium transition"
                  >
                    Try Something Else
                  </button>
                  
                  <button
                    onClick={resetTryOn}
                    className="flex-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 py-3 rounded-md font-medium transition"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;