export const formatPrice = (price: number) => {
  return (
    price
      ?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') || '0'
  );
};
