import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Share2, Image, User, Send } from 'lucide-react';
import { useStore } from '../store';
import { FashionPost } from '../types';

const Community = () => {
  const { fashionPosts, addFashionPost, likePost, user } = useStore();
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    if (newPostContent.trim() === '' && !newPostImage) return;
    
    addFashionPost({
      userId: user.id,
      user: user,
      title: 'New Fashion Inspiration',
      description: newPostContent,
      imageUrl: newPostImage || 'https://images.pexels.com/photos/2531734/pexels-photo-2531734.jpeg',
      items: []
    });
    
    setNewPostContent('');
    setNewPostImage(null);
    setShowNewPostForm(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // In a real implementation, this would upload to cloud storage
      // For this demo, we'll use a placeholder
      setNewPostImage('https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg');
    }
  };

  // Mock data for initial posts if the store has none
  const mockPosts: FashionPost[] = [
    {
      id: 'post1',
      userId: 'user1',
      user: { id: 'user1', name: 'Aisha Johnson', location: 'New York', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' },
      title: 'My First Saree Experience',
      description: 'Finally found a beautiful silk saree that fits perfectly! The size guide was so helpful for getting the right length.',
      imageUrl: 'https://images.pexels.com/photos/2531734/pexels-photo-2531734.jpeg',
      likes: 24,
      createdAt: new Date(2023, 4, 15)
    },
    {
      id: 'post2',
      userId: 'user2',
      user: { id: 'user2', name: 'David Chen', location: 'San Francisco', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
      title: 'Traditional Wedding Attire',
      description: 'Wore a traditional Chinese hanfu for a cultural wedding celebration. So many compliments!',
      imageUrl: 'https://images.pexels.com/photos/5906775/pexels-photo-5906775.jpeg',
      likes: 37,
      createdAt: new Date(2023, 5, 2)
    },
    {
      id: 'post3',
      userId: 'user3',
      user: { id: 'user3', name: 'Oluwaseun Adebayo', location: 'Houston', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
      title: 'Agbada for Graduation',
      description: 'Celebrating my master\'s graduation in style with this custom agbada. The virtual try-on helped me pick the perfect design!',
      imageUrl: 'https://images.pexels.com/photos/13727829/pexels-photo-13727829.jpeg',
      likes: 52,
      createdAt: new Date(2023, 5, 20)
    }
  ];

  const displayPosts = fashionPosts.length > 0 ? fashionPosts : mockPosts;
  
  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Fashion Community</h1>
            <button
              onClick={() => setShowNewPostForm(!showNewPostForm)}
              className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md font-medium transition"
            >
              {showNewPostForm ? 'Cancel' : 'Share Your Style'}
            </button>
          </div>

          {/* New Post Form */}
          {showNewPostForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6 mb-8"
            >
              <h2 className="text-xl font-semibold mb-4">Share Your Fashion Inspiration</h2>
              
              <form onSubmit={handlePostSubmit}>
                <div className="mb-4">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share your fashion story or styling tips..."
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    rows={4}
                  />
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      className="sr-only"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md cursor-pointer transition"
                    >
                      <Image className="w-5 h-5 mr-2" />
                      Add Photo
                    </label>
                  </div>
                  
                  {newPostImage && (
                    <div className="relative">
                      <img 
                        src={newPostImage} 
                        alt="Post preview" 
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setNewPostImage(null)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md font-medium transition flex items-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Post Feed */}
          <div className="space-y-8">
            {displayPosts.map(post => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-4 flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src={post.user?.avatar || 'https://via.placeholder.com/40'} 
                      alt={post.user?.name || 'User'} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <Link to={`/profile/${post.userId}`} className="font-medium text-gray-900 hover:underline">
                      {post.user?.name || 'Anonymous User'}
                    </Link>
                    <p className="text-gray-500 text-sm">{post.user?.location || 'Unknown location'}</p>
                  </div>
                  <div className="ml-auto text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                
                {/* Post Image */}
                <div className="relative">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-auto"
                  />
                </div>
                
                {/* Post Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-4">{post.description}</p>
                  
                  {/* Post Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button
                      onClick={() => likePost(post.id)}
                      className="flex items-center text-gray-600 hover:text-primary-500 transition"
                    >
                      <Heart className="w-5 h-5 mr-1" />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button
                      className="flex items-center text-gray-600 hover:text-primary-500 transition"
                    >
                      <MessageSquare className="w-5 h-5 mr-1" />
                      <span>Comment</span>
                    </button>
                    
                    <button
                      className="flex items-center text-gray-600 hover:text-primary-500 transition"
                    >
                      <Share2 className="w-5 h-5 mr-1" />
                      <span>Share</span>
                    </button>
                  </div>
                  
                  {/* Comments Section (simplified) */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0 bg-gray-200">
                        <User className="w-full h-full p-1.5 text-gray-400" />
                      </div>
                      <div className="flex-grow relative">
                        <input 
                          type="text" 
                          placeholder="Add a comment..."
                          className="w-full border border-gray-200 rounded-full py-2 pl-4 pr-10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-primary-600">
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;