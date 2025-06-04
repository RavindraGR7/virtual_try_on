import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, Image, Grid, List, Heart } from 'lucide-react';
import { useStore } from '../store';

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user, isAuthenticated, fashionPosts, tryOnSessions, favorites, clothingItems } = useStore();
  const [activeTab, setActiveTab] = useState<'posts' | 'tryons' | 'favorites'>('posts');
  
  // In a real application, we'd fetch the user data based on userId
  // For this demo, we'll use mock data
  const isOwnProfile = userId === 'me' || userId === user?.id;
  const profileUser = isOwnProfile ? user : {
    id: 'user1',
    name: 'Aisha Johnson',
    location: 'New York, NY',
    bio: 'Fashion enthusiast exploring global styles. Love discovering clothing that connects me to my heritage.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
  };
  
  // In a real app, these would be filtered from the store or fetched from an API
  const userPosts = fashionPosts.filter(post => post.userId === profileUser?.id) || [];
  const userTryOns = tryOnSessions.filter(session => session.userId === profileUser?.id) || [];
  const favoriteItems = clothingItems.filter(item => favorites.includes(item.id)) || [];
  
  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-primary-500 to-accent-500"></div>
            
            {/* Profile Info */}
            <div className="relative px-6 py-8">
              {/* Profile Picture */}
              <div className="absolute -top-12 left-6 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
                {profileUser.avatar ? (
                  <img 
                    src={profileUser.avatar} 
                    alt={profileUser.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              
              {/* Edit Profile Button (only shown for own profile) */}
              {isOwnProfile && (
                <div className="absolute top-4 right-4">
                  <button className="flex items-center bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-md shadow-sm border border-gray-200 transition">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
              )}
              
              {/* Profile Info */}
              <div className="mt-6">
                <h1 className="text-2xl font-bold text-gray-900">{profileUser.name}</h1>
                <p className="text-gray-600">{profileUser.location}</p>
                
                {profileUser.bio && (
                  <p className="mt-4 text-gray-700">{profileUser.bio}</p>
                )}
                
                <div className="mt-6 flex space-x-6">
                  <div>
                    <span className="font-bold text-gray-900">{userPosts.length}</span>
                    <span className="text-gray-500 ml-1">Posts</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">{userTryOns.length}</span>
                    <span className="text-gray-500 ml-1">Try-Ons</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">{favoriteItems.length}</span>
                    <span className="text-gray-500 ml-1">Favorites</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-t-xl shadow-md overflow-hidden mb-1">
            <div className="flex">
              <TabButton 
                active={activeTab === 'posts'} 
                onClick={() => setActiveTab('posts')}
                icon={<Grid className="w-5 h-5 mr-2" />}
                label="Fashion Posts"
              />
              <TabButton 
                active={activeTab === 'tryons'} 
                onClick={() => setActiveTab('tryons')}
                icon={<Shirt className="w-5 h-5 mr-2" />}
                label="Try-On History"
              />
              <TabButton 
                active={activeTab === 'favorites'} 
                onClick={() => setActiveTab('favorites')}
                icon={<Heart className="w-5 h-5 mr-2" />}
                label="Favorites"
              />
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-b-xl shadow-md p-6">
            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div>
                {userPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userPosts.map(post => (
                      <motion.div 
                        key={post.id}
                        whileHover={{ y: -5 }}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-medium text-lg mb-2">{post.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{post.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-sm">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                            <div className="flex items-center text-gray-500">
                              <Heart className="w-4 h-4 mr-1" />
                              <span>{post.likes}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Image className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                    <p className="text-gray-500">
                      {isOwnProfile ? 'Share your first fashion inspiration!' : 'This user hasn\'t posted any fashion inspiration yet.'}
                    </p>
                    {isOwnProfile && (
                      <button 
                        className="mt-4 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md font-medium transition"
                      >
                        Create Post
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Try-Ons Tab */}
            {activeTab === 'tryons' && (
              <div>
                {userTryOns.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {userTryOns.map((tryOn, index) => {
                      const item = clothingItems.find(item => item.id === tryOn.itemId);
                      return (
                        <motion.div 
                          key={index}
                          whileHover={{ y: -5 }}
                          className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                          <div className="relative">
                            <img 
                              src={tryOn.resultImageUrl || item?.modelImageUrl || ''}
                              alt="Try-on result"
                              className="w-full h-64 object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                              <p className="text-white font-medium">
                                {item?.name || 'Unknown item'}
                              </p>
                              <p className="text-white/80 text-sm">
                                {new Date(tryOn.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Shirt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No try-on history</h3>
                    <p className="text-gray-500">
                      {isOwnProfile ? 'You haven\'t tried on any clothing items yet.' : 'This user hasn\'t tried on any clothing items yet.'}
                    </p>
                    {isOwnProfile && (
                      <Link 
                        to="/try-on"
                        className="mt-4 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md font-medium transition inline-block"
                      >
                        Try On Now
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                {favoriteItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {favoriteItems.map(item => (
                      <motion.div 
                        key={item.id}
                        whileHover={{ y: -5 }}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <Link to={`/shop/${item.id}`}>
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-3">
                            <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-gray-500 text-sm">{item.origin}</p>
                              <p className="text-primary-600 font-semibold">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                    <p className="text-gray-500">
                      {isOwnProfile ? 'You haven\'t saved any favorites yet.' : 'This user hasn\'t saved any favorites yet.'}
                    </p>
                    {isOwnProfile && (
                      <Link 
                        to="/shop"
                        className="mt-4 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md font-medium transition inline-block"
                      >
                        Browse Shop
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-4 px-3 flex justify-center items-center font-medium transition ${
      active
        ? 'text-primary-600 border-b-2 border-primary-500'
        : 'text-gray-500 hover:text-gray-800'
    }`}
  >
    {icon}
    {label}
  </button>
);

export default Profile;