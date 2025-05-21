import ProductCard from "@/components/cards/product-card";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  gridCols?: {
    lg?: number;
    md?: number;
    sm?: number;
    default?: number;
  };
}

function ProductGrid({
  products,
  gridCols = {
    lg: 5,
    md: 5,
    sm: 2,
    default: 1,
  },
}: ProductGridProps) {
  const getGridColsClass = () => {
    return `grid lg:grid-cols-${gridCols.lg} md:grid-cols-${gridCols.md} sm:grid-cols-${gridCols.sm} grid-cols-${gridCols.default}`;
  };

  return (
    <div className={getGridColsClass()}>
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          srcImage={product.image}
          name={product.name}
          author={product.author}
          price={product.price}
          category={product.category.name}
          slug={product.slug}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
