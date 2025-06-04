import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ruler, Info } from 'lucide-react';

const SizeGuide = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('South Asia');
  const [selectedGender, setSelectedGender] = useState<string>('women');
  const [userMeasurements, setUserMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    inseam: '',
    shoulder: '',
  });
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  // Size conversion tables
  const sizeCharts = {
    'South Asia': {
      women: [
        { us: 'XS/0-2', region: 'S', chest: '32-33', waist: '24-25', hips: '35-36' },
        { us: 'S/4-6', region: 'M', chest: '34-35', waist: '26-27', hips: '37-38' },
        { us: 'M/8-10', region: 'L', chest: '36-37', waist: '28-29', hips: '39-40' },
        { us: 'L/12-14', region: 'XL', chest: '38-40', waist: '30-32', hips: '41-43' },
        { us: 'XL/16-18', region: 'XXL', chest: '41-43', waist: '33-35', hips: '44-46' },
      ],
      men: [
        { us: 'XS/34', region: '36', chest: '34-36', waist: '28-30', shoulder: '17-17.5' },
        { us: 'S/36', region: '38', chest: '36-38', waist: '30-32', shoulder: '17.5-18' },
        { us: 'M/38-40', region: '40', chest: '38-40', waist: '32-34', shoulder: '18-18.5' },
        { us: 'L/42-44', region: '42', chest: '42-44', waist: '36-38', shoulder: '18.5-19' },
        { us: 'XL/46', region: '44', chest: '46-48', waist: '40-42', shoulder: '19-19.5' },
      ]
    },
    'West Africa': {
      women: [
        { us: 'XS/0-2', region: '8/30', chest: '32-33', waist: '24-25', hips: '35-36' },
        { us: 'S/4-6', region: '10/32', chest: '34-35', waist: '26-27', hips: '37-38' },
        { us: 'M/8-10', region: '12/34', chest: '36-37', waist: '28-29', hips: '39-40' },
        { us: 'L/12-14', region: '14/36', chest: '38-40', waist: '30-32', hips: '41-43' },
        { us: 'XL/16-18', region: '16/38', chest: '41-43', waist: '33-35', hips: '44-46' },
      ],
      men: [
        { us: 'XS/34', region: 'S/Small', chest: '34-36', waist: '28-30', shoulder: '17-17.5' },
        { us: 'S/36', region: 'M/Medium', chest: '36-38', waist: '30-32', shoulder: '17.5-18' },
        { us: 'M/38-40', region: 'L/Large', chest: '38-40', waist: '32-34', shoulder: '18-18.5' },
        { us: 'L/42-44', region: 'XL/X-Large', chest: '42-44', waist: '36-38', shoulder: '18.5-19' },
        { us: 'XL/46', region: 'XXL/XX-Large', chest: '46-48', waist: '40-42', shoulder: '19-19.5' },
      ]
    },
    'East Asia': {
      women: [
        { us: 'XS/0-2', region: 'S/36', chest: '32-33', waist: '24-25', hips: '35-36' },
        { us: 'S/4-6', region: 'M/38', chest: '34-35', waist: '26-27', hips: '37-38' },
        { us: 'M/8-10', region: 'L/40', chest: '36-37', waist: '28-29', hips: '39-40' },
        { us: 'L/12-14', region: 'XL/42', chest: '38-40', waist: '30-32', hips: '41-43' },
        { us: 'XL/16-18', region: 'XXL/44', chest: '41-43', waist: '33-35', hips: '44-46' },
      ],
      men: [
        { us: 'XS/34', region: '165/84A', chest: '34-36', waist: '28-30', shoulder: '17-17.5' },
        { us: 'S/36', region: '170/88A', chest: '36-38', waist: '30-32', shoulder: '17.5-18' },
        { us: 'M/38-40', region: '175/92A', chest: '38-40', waist: '32-34', shoulder: '18-18.5' },
        { us: 'L/42-44', region: '180/96A', chest: '42-44', waist: '36-38', shoulder: '18.5-19' },
        { us: 'XL/46', region: '185/100A', chest: '46-48', waist: '40-42', shoulder: '19-19.5' },
      ]
    }
  };

  const regions = Object.keys(sizeCharts);

  const handleMeasurementChange = (field: string, value: string) => {
    setUserMeasurements({
      ...userMeasurements,
      [field]: value,
    });
  };

  const findSize = () => {
    const chart = sizeCharts[selectedRegion as keyof typeof sizeCharts][selectedGender as 'women' | 'men'];
    
    if (!chart) return;
    
    // In a real implementation, this would use a more sophisticated algorithm
    // This is a simple example that just checks the chest measurement
    const chestSize = parseInt(userMeasurements.chest);
    
    if (isNaN(chestSize)) {
      setRecommendedSize('Please enter your chest measurement');
      return;
    }
    
    // Find the closest size
    let selectedSize = null;
    for (const size of chart) {
      const chestRange = size.chest.split('-').map(s => parseInt(s.trim()));
      if (chestSize >= chestRange[0] && chestSize <= chestRange[1]) {
        selectedSize = size;
        break;
      }
    }
    
    if (selectedSize) {
      setRecommendedSize(`Your US size is approximately ${selectedSize.us}, which corresponds to ${selectedSize.region} in ${selectedRegion} sizing.`);
    } else {
      setRecommendedSize('We couldn\'t determine your size with the given measurements. Please check your measurements or contact us for assistance.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    findSize();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">International Size Guide</h1>
            <p className="text-gray-600 text-lg">
              Find your perfect fit with our comprehensive size conversion tool
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-10">
            <div className="flex items-center mb-6">
              <Ruler className="text-primary-500 w-6 h-6 mr-3" />
              <h2 className="text-2xl font-semibold">Size Converter</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Your Region of Origin
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Gender
                  </label>
                  <div className="flex gap-4">
                    <label className={`flex-1 flex items-center justify-center border rounded-md py-2 px-4 cursor-pointer ${selectedGender === 'women' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                      <input
                        type="radio"
                        name="gender"
                        value="women"
                        checked={selectedGender === 'women'}
                        onChange={() => setSelectedGender('women')}
                        className="sr-only"
                      />
                      Women's
                    </label>
                    
                    <label className={`flex-1 flex items-center justify-center border rounded-md py-2 px-4 cursor-pointer ${selectedGender === 'men' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                      <input
                        type="radio"
                        name="gender"
                        value="men"
                        checked={selectedGender === 'men'}
                        onChange={() => setSelectedGender('men')}
                        className="sr-only"
                      />
                      Men's
                    </label>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-4">Enter Your Measurements (inches)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chest
                  </label>
                  <input
                    type="number"
                    value={userMeasurements.chest}
                    onChange={(e) => handleMeasurementChange('chest', e.target.value)}
                    placeholder="e.g., 36"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waist
                  </label>
                  <input
                    type="number"
                    value={userMeasurements.waist}
                    onChange={(e) => handleMeasurementChange('waist', e.target.value)}
                    placeholder="e.g., 30"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                {selectedGender === 'women' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hips
                    </label>
                    <input
                      type="number"
                      value={userMeasurements.hips}
                      onChange={(e) => handleMeasurementChange('hips', e.target.value)}
                      placeholder="e.g., 38"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                )}
                
                {selectedGender === 'men' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shoulder Width
                    </label>
                    <input
                      type="number"
                      value={userMeasurements.shoulder}
                      onChange={(e) => handleMeasurementChange('shoulder', e.target.value)}
                      placeholder="e.g., 18"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inseam
                  </label>
                  <input
                    type="number"
                    value={userMeasurements.inseam}
                    onChange={(e) => handleMeasurementChange('inseam', e.target.value)}
                    placeholder="e.g., 32"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-md font-medium transition"
              >
                Find My Size
              </button>
            </form>

            {recommendedSize && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-primary-50 border border-primary-100 rounded-lg"
              >
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Your Recommended Size</h3>
                <p className="text-primary-700 mb-2">{recommendedSize}</p>
                <div className="flex items-center mt-4">
                  <Info className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />
                  <p className="text-sm text-primary-600">
                    This is an estimate based on standard sizing. Individual brands may vary.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Size Conversion Charts</h2>
              <p className="text-gray-600 mt-1">
                Reference these charts when shopping for traditional clothing
              </p>
            </div>
            
            <div className="px-6 py-4 border-b">
              <h3 className="font-medium mb-4">Select Region</h3>
              <div className="flex flex-wrap gap-2">
                {regions.map(region => (
                  <button 
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-4 py-1.5 rounded-full text-sm ${
                      selectedRegion === region
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      US Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {selectedRegion} Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chest (inches)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Waist (inches)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {selectedGender === 'women' ? 'Hips (inches)' : 'Shoulder (inches)'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sizeCharts[selectedRegion as keyof typeof sizeCharts][selectedGender as 'women' | 'men'].map((size, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {size.us}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {size.region}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {size.chest}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {size.waist}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {selectedGender === 'women' ? size.hips : size.shoulder}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-12 bg-gray-100 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">How to Measure Yourself</h3>
            <p className="text-gray-600 mb-6">
              For the most accurate size conversion, use a soft tape measure and follow these guidelines:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">1</div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Chest/Bust</h4>
                  <p className="text-gray-600 text-sm">
                    Measure around the fullest part of your chest, keeping the tape horizontal.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">2</div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Waist</h4>
                  <p className="text-gray-600 text-sm">
                    Measure around your natural waistline, keeping the tape comfortably loose.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">3</div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Hips</h4>
                  <p className="text-gray-600 text-sm">
                    Measure around the fullest part of your hips, typically about 8 inches below your waistline.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">4</div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Inseam</h4>
                  <p className="text-gray-600 text-sm">
                    Measure from the crotch to the bottom of the ankle along the inside of the leg.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;