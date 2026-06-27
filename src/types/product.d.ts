declare namespace Product {
  type BestSellerCardProps = {
    image: string;
    title: string;
    details?: string;
    price?: number;
    isBestSeller?: boolean;
    isEvenIem?: boolean;
  };

  type ProductCategoryCardProps = {
    image: string;
    title: string;
    url: string;
    className?: ClassValue;
  };

  type ProductCardProps = {
    id: string;
    image: string;
    title: string;
    price?: number;
    details?: React.ReactNode;
    disabledLink?: boolean;
    defaultBackground?: boolean;
    className?: ClassValue;
    imageClassName?: ClassValue;
    onClick?: () => void;
  };

  type BestSellerProduct = {
    id: string;
    image: string;
    title: string;
    price: number;
    isBestSeller?: boolean;
    details?: React.ReactNode;
  };

  type ShopAllBasketMenuItem = {
    id: string;
    image: string;
    title: string;
    url: string;
    description?: string;
    className?: ClassValue;
    imageClassName?: ClassValue;
  };
}
