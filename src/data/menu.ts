export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
}

export type MenuCategory = 'Rice' | 'Swallow' | 'Soups' | 'Proteins' | 'Sides' | 'Drinks' | 'Specials';

export const menuCategories: MenuCategory[] = [
  'Rice',
  'Swallow',
  'Soups',
  'Proteins',
  'Sides',
  'Drinks',
  'Specials',
];

export const menuItems: MenuItem[] = [
  // Rice
  {
    id: 'jollof-1',
    name: 'Jollof Rice',
    description: 'Our signature party jollof, smoky and rich, served with fried plantains and coleslaw.',
    price: 4500,
    category: 'Rice',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80',
    popular: true,
  },
  {
    id: 'ofada-1',
    name: 'Ofada Rice',
    description: 'Locally sourced ofada rice with ayamase stew, boiled eggs and assorted proteins.',
    price: 5500,
    category: 'Rice',
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=600&q=80',
  },
  {
    id: 'fried-rice-1',
    name: 'Nigerian Fried Rice',
    description: 'Wok-tossed with mixed vegetables, curry, and your choice of protein.',
    price: 4200,
    category: 'Rice',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
  },
  {
    id: 'native-rice-1',
    name: 'Native Rice',
    description: 'Ukwa-style rice cooked with palm oil, periwinkle, and traditional spices.',
    price: 4800,
    category: 'Rice',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80',
  },
  // Swallow
  {
    id: 'pounded-yam-1',
    name: 'Pounded Yam',
    description: 'Smooth, stretchy pounded yam — the perfect partner for any soup.',
    price: 2500,
    category: 'Swallow',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80',
    popular: true,
  },
  {
    id: 'eba-1',
    name: 'Eba',
    description: 'Golden garri stirred to silky perfection. Pairs beautifully with egusi.',
    price: 2000,
    category: 'Swallow',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80',
  },
  {
    id: 'fufu-1',
    name: 'Fufu',
    description: 'Light and airy cassava fufu, pounded to the ideal consistency.',
    price: 2200,
    category: 'Swallow',
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=600&q=80',
  },
  {
    id: 'semolina-1',
    name: 'Semolina',
    description: 'Creamy semovita, smooth and satisfying.',
    price: 2000,
    category: 'Swallow',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80',
  },
  {
    id: 'amala-1',
    name: 'Amala',
    description: 'Rich, dark yam flour swallow — a Yoruba classic.',
    price: 2300,
    category: 'Swallow',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80',
  },
  // Soups
  {
    id: 'egusi-1',
    name: 'Egusi Soup',
    description: 'Thick melon seed soup with spinach, palm oil, and assorted meats.',
    price: 4000,
    category: 'Soups',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
    popular: true,
  },
  {
    id: 'ewedu-1',
    name: 'Ewedu & Gbegiri',
    description: 'Jute leaf soup paired with smooth bean soup — a Lagosian staple.',
    price: 3500,
    category: 'Soups',
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=600&q=80',
  },
  {
    id: 'okro-1',
    name: 'Okra Soup',
    description: 'Fresh okra soup with fish, stockfish, and a hint of crayfish.',
    price: 3800,
    category: 'Soups',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
  },
  {
    id: 'obe-ata-1',
    name: 'Obe Ata (Stew Base)',
    description: 'Rich, slow-cooked tomato and pepper stew base — the soul of Nigerian cooking.',
    price: 3000,
    category: 'Soups',
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=600&q=80',
  },
  // Proteins
  {
    id: 'suya-1',
    name: 'Suya Platter',
    description: 'Grilled beef suya with yaji spice, onions, and fresh tomatoes.',
    price: 5000,
    category: 'Proteins',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',
    popular: true,
  },
  {
    id: 'pepper-soup-1',
    name: 'Goat Meat Pepper Soup',
    description: 'Fiery, aromatic pepper soup with tender goat meat and utazi leaves.',
    price: 5500,
    category: 'Proteins',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
    spicy: true,
  },
  {
    id: 'fried-chicken-1',
    name: 'Fried Chicken',
    description: 'Crispy, golden fried chicken marinated in Nigerian spices.',
    price: 4500,
    category: 'Proteins',
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=600&q=80',
  },
  {
    id: 'grilled-fish-1',
    name: 'Grilled Tilapia',
    description: 'Whole tilapia, grilled with pepper sauce and served with yam chips.',
    price: 6500,
    category: 'Proteins',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',
  },
  // Sides
  {
    id: 'plantain-1',
    name: 'Fried Plantain (Dodo)',
    description: 'Sweet, ripe plantain fried to golden perfection.',
    price: 1500,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80',
    popular: true,
  },
  {
    id: 'yam-chips-1',
    name: 'Yam Chips',
    description: 'Crispy fried yam chips, lightly salted.',
    price: 1800,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80',
  },
  {
    id: 'moi-moi-1',
    name: 'Moi Moi',
    description: 'Steamed bean pudding with eggs and fish — a party essential.',
    price: 1200,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
  },
  {
    id: 'akara-1',
    name: 'Akara',
    description: 'Crispy fried bean cakes — the perfect breakfast side.',
    price: 800,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80',
  },
  // Drinks
  {
    id: 'zobo-1',
    name: 'Zobo (Hibiscus Drink)',
    description: 'Refreshing cold hibiscus drink with pineapple and ginger.',
    price: 1500,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1560508179-b2c9b389c13a?w=600&q=80',
    popular: true,
  },
  {
    id: ' Chapman-1',
    name: 'Chapman',
    description: 'Nigeria\'s signature cocktail — Fanta, Sprite, grenadine and bitters.',
    price: 2000,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1560508179-b2c9b389c13a?w=600&q=80',
  },
  {
    id: 'palm-wine-1',
    name: 'Palm Wine',
    description: 'Fresh palm wine, mildly sweet and naturally fermented.',
    price: 2500,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1560508179-b2c9b389c13a?w=600&q=80',
  },
  {
    id: 'kunu-1',
    name: 'Kunu',
    description: 'Traditional grain drink, spiced with ginger and cloves.',
    price: 1200,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1560508179-b2c9b389c13a?w=600&q=80',
  },
  // Specials
  {
    id: 'special-1',
    name: 'Item7Go Platter',
    description: 'Our signature sharing platter — jollof, suya, plantain, and more. Feeds 2-3.',
    price: 12000,
    category: 'Specials',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
    popular: true,
  },
  {
    id: 'special-2',
    name: 'Weekend Special',
    description: 'Assorted rice, soup, swallow, and protein. A full Nigerian feast.',
    price: 8500,
    category: 'Specials',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
  },
  {
    id: 'special-3',
    name: 'Party Pack',
    description: 'Jollof rice, fried rice, chicken, plantain, salad — feeds 4-5.',
    price: 18000,
    category: 'Specials',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
  },
];
