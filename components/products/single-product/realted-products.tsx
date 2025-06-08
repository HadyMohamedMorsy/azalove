import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";

const relatedProducts = [
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    price: 199,
    originalPrice: 249,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 149,
    originalPrice: 199,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
  },
  {
    id: 4,
    name: "USB-C Fast Charger",
    price: 29,
    originalPrice: 39,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Phone Stand",
    price: 19,
    originalPrice: 29,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
  },
];

const RelatedProducts = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">You might also like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card
            key={product.id}
            className="group cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-4">
              <div className="relative mb-4">
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 backdrop-blur-sm"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium truncate">{product.name}</h3>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    {product.rating}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">${product.price}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                </div>
                <Button size="sm" className="w-full">
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
