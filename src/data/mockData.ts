import type { ClothingItem } from '../types';

export const mockClothingItems: ClothingItem[] = [
  {
    id: '1',
    name: 'Traditional Silk Saree',
    description: 'Elegant Kanjivaram silk saree with intricate gold border design, perfect for special occasions.',
    category: 'saree',
    origin: 'South Asia',
    imageUrl: 'https://images.pexels.com/photos/2531734/pexels-photo-2531734.jpeg',
    modelImageUrl: 'https://images.pexels.com/photos/2531734/pexels-photo-2531734.jpeg',
    price: 149.99,
    affiliateLink: 'https://example.com/saree1',
    sizes: [
      { id: 's1', region: 'India', value: 'Free Size', usEquivalent: 'S-M-L' }
    ],
    colors: ['Red', 'Gold']
  },
  {
    id: '2',
    name: 'Premium Agbada Set',
    description: 'Three-piece Agbada set with embroidered design, made from high-quality cotton blend.',
    category: 'agbada',
    origin: 'West Africa',
    imageUrl: 'https://images.pexels.com/photos/13727829/pexels-photo-13727829.jpeg',
    modelImageUrl: 'https://images.pexels.com/photos/13727829/pexels-photo-13727829.jpeg',
    price: 189.99,
    affiliateLink: 'https://example.com/agbada1',
    sizes: [
      { id: 'a1', region: 'Nigeria', value: 'L', usEquivalent: 'M' },
      { id: 'a2', region: 'Nigeria', value: 'XL', usEquivalent: 'L' },
      { id: 'a3', region: 'Nigeria', value: 'XXL', usEquivalent: 'XL' }
    ],
    colors: ['White', 'Blue', 'Gold']
  },
  {
    id: '3',
    name: 'Traditional Hanfu Dress',
    description: 'Authentic Hanfu with flowing sleeves and traditional embroidery patterns.',
    category: 'hanfu',
    origin: 'East Asia',
    imageUrl: 'https://images.pexels.com/photos/5906775/pexels-photo-5906775.jpeg',
    modelImageUrl: 'https://images.pexels.com/photos/5906775/pexels-photo-5906775.jpeg',
    price: 129.99,
    affiliateLink: 'https://example.com/hanfu1',
    sizes: [
      { id: 'h1', region: 'China', value: 'M', usEquivalent: 'S' },
      { id: 'h2', region: 'China', value: 'L', usEquivalent: 'M' },
      { id: 'h3', region: 'China', value: 'XL', usEquivalent: 'L' }
    ],
    colors: ['Red', 'White']
  },
  {
    id: '4',
    name: 'Silk Kimono',
    description: 'Hand-crafted silk kimono with traditional Japanese patterns and obi belt.',
    category: 'kimono',
    origin: 'East Asia',
    imageUrl: 'https://images.pexels.com/photos/5706736/pexels-photo-5706736.jpeg',
    modelImageUrl: 'https://images.pexels.com/photos/5706736/pexels-photo-5706736.jpeg',
    price: 199.99,
    affiliateLink: 'https://example.com/kimono1',
    sizes: [
      { id: 'k1', region: 'Japan', value: 'One Size', usEquivalent: 'S-M' }
    ],
    colors: ['Blue', 'White']
  },
  {
    id: '5',
    name: 'Men\'s Kurta Pajama',
    description: 'Comfortable cotton kurta with matching pajama, perfect for everyday wear or special occasions.',
    category: 'kurta',
    origin: 'South Asia',
    imageUrl: 'https://images.pexels.com/photos/2834653/pexels-photo-2834653.jpeg',
    modelImageUrl: 'https://images.pexels.com/photos/2834653/pexels-photo-2834653.jpeg',
    price: 79.99,
    affiliateLink: 'https://example.com/kurta1',
    sizes: [
      { id: 'ku1', region: 'India', value: '40', usEquivalent: 'M' },
      { id: 'ku2', region: 'India', value: '42', usEquivalent: 'L' },
      { id: 'ku3', region: 'India', value: '44', usEquivalent: 'XL' }
    ],
    colors: ['White', 'Beige', 'Blue']
  },
  {
    id: '6',
    name: 'Embroidered Cheongsam',
    description: 'Elegant silk cheongsam with floral embroidery and traditional high collar.',
    category: 'cheongsam',
    origin: 'East Asia',
    imageUrl: 'https://images.pexels.com/photos/4937224/pexels-photo-4937224.jpeg',
    modelImageUrl: 'https://images.pexels.com/photos/4937224/pexels-photo-4937224.jpeg',
    price: 159.99,
    affiliateLink: 'https://example.com/cheongsam1',
    sizes: [
      { id: 'c1', region: 'China', value: 'S', usEquivalent: 'XS' },
      { id: 'c2', region: 'China', value: 'M', usEquivalent: 'S' },
      { id: 'c3', region: 'China', value: 'L', usEquivalent: 'M' }
    ],
    colors: ['Red', 'Gold']
  }
];