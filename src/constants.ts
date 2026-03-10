import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Perfume {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  image: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

export const PERFUMES: Perfume[] = [
  {
    id: 'velour-mist',
    name: 'SYNRA Velour Mist',
    tagline: 'The Softness of Midnight',
    description: 'A delicate blend of white musk and violet petals, designed for the quiet moments of elegance.',
    color: '#a78bfa',
    image: 'https://picsum.photos/seed/velour/800/1200',
    notes: {
      top: ['Bergamot', 'White Pepper'],
      heart: ['Violet', 'Iris'],
      base: ['White Musk', 'Sandalwood']
    }
  },
  {
    id: 'nocturne-ember',
    name: 'SYNRA Nocturne Ember',
    tagline: 'Ignite the Night',
    description: 'A bold, smoky fragrance with hints of spiced amber and charred cedar wood.',
    color: '#f59e0b',
    image: 'https://picsum.photos/seed/ember/800/1200',
    notes: {
      top: ['Saffron', 'Cardamom'],
      heart: ['Amber', 'Incense'],
      base: ['Cedarwood', 'Vanilla']
    }
  },
  {
    id: 'citrus-nova',
    name: 'SYNRA Citrus Nova',
    tagline: 'Electric Vitality',
    description: 'A burst of futuristic citrus notes, sharp and energizing like a neon sunrise.',
    color: '#10b981',
    image: 'https://picsum.photos/seed/citrus/800/1200',
    notes: {
      top: ['Yuzu', 'Lime'],
      heart: ['Ginger', 'Mint'],
      base: ['Vetiver', 'Ambergris']
    }
  },
  {
    id: 'rose-eclipse',
    name: 'SYNRA Rose Eclipse',
    tagline: 'Beauty in the Shadows',
    description: 'A dark, gothic rose fragrance wrapped in black leather and patchouli.',
    color: '#ef4444',
    image: 'https://picsum.photos/seed/rose/800/1200',
    notes: {
      top: ['Blackcurrant', 'Pink Pepper'],
      heart: ['Damask Rose', 'Leather'],
      base: ['Patchouli', 'Oud']
    }
  },
  {
    id: 'aurora-elixir',
    name: 'SYNRA Aurora Elixir',
    tagline: 'Celestial Radiance',
    description: 'An ethereal scent that captures the shimmering lights of the northern sky.',
    color: '#3b82f6',
    image: 'https://picsum.photos/seed/aurora/800/1200',
    notes: {
      top: ['Aldehydes', 'Sea Salt'],
      heart: ['Lily of the Valley', 'Ozone'],
      base: ['White Woods', 'Crystal Musk']
    }
  }
];
