import { nonCustomBasketsList } from './basket';

export const bestSellerProducts: Product.BestSellerProduct[] = [
  {
    ...nonCustomBasketsList[3],
    isBestSeller: true,
  },
  {
    ...nonCustomBasketsList[8],
    isBestSeller: false,
  },
  {
    ...nonCustomBasketsList[12],
    isBestSeller: false,
  },
  {
    ...nonCustomBasketsList[15],
    isBestSeller: true,
  },
  {
    ...nonCustomBasketsList[2],
    isBestSeller: false,
  },
];
