import { Review } from '../types';

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    author: 'Aarav Sharma',
    rating: 5,
    date: '2026-10-18',
    title: 'Out of this world chocolate ganache!',
    comment: 'Ordered the 1kg Chocolate Truffle for my mother\'s 50th birthday. The sponge was heavenly moist, not overly sweet, and the gold leaf finish looked like a five-star hotel creation.',
    isVerified: true
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    author: 'Pooja Venkatesh',
    rating: 5,
    date: '2026-10-14',
    title: 'Arrived exactly on time at midnight',
    comment: 'The midnight delivery slot worked flawlessly. Cake was kept perfectly cold and intact. Every single guest complimented the flavor.',
    isVerified: true
  },
  {
    id: 'rev-3',
    productId: 'prod-3',
    author: 'Rohan Mehra',
    rating: 5,
    date: '2026-10-20',
    title: 'Authentic cream cheese frosting',
    comment: 'So many bakeries use artificial whip instead of real cream cheese. Cake Paradise uses genuine Philadelphia-style cream cheese. Absolute perfection.',
    isVerified: true
  },
  {
    id: 'rev-4',
    productId: 'prod-10',
    author: 'Sneha Patel',
    rating: 5,
    date: '2026-10-15',
    title: 'The best cheesecake in town',
    comment: 'Crust had that authentic graham butter crunch, and the blueberry reduction was fresh with real plump berries. Highly recommended!',
    isVerified: true
  },
  {
    id: 'rev-5',
    productId: 'prod-16',
    author: 'Vikram & Natasha Singhania',
    rating: 5,
    date: '2026-10-02',
    title: 'Unbelievable wedding showstopper',
    comment: 'The pastry chefs customized our 3-tier cake with edible jasmine and rose details. It was the visual anchor of our banquet reception and tasted incredible.',
    isVerified: true
  }
];
