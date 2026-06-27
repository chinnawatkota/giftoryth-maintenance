type ProductDetailsListProps = {
  details?: React.ReactNode;
};

const ProductDetailsList = ({ details }: ProductDetailsListProps) => {
  if (!details) {
    return null;
  }

  if (typeof details !== 'string') {
    return <>{details}</>;
  }

  const items = details
    .split('\n')
    .map(item => item.trim())
    .filter(Boolean);

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="list-disc px-3">
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default ProductDetailsList;
