import { Card } from "@/components/ui/card";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const domain = process.env.MAIN_DOMAIN;
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <Card className="overflow-hidden">
        <div className="aspect-square bg-gray-50 flex items-center justify-center">
          <img
            src={`${domain}${images[selectedImage]}`}
            alt="Product"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Card>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => {
          const imageKey = image.split("/").pop() || `image-${index}`;
          return (
            <Card
              key={imageKey}
              className={`cursor-pointer overflow-hidden transition-all ${
                selectedImage === index
                  ? "ring-2 ring-primary"
                  : "hover:opacity-80"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-square bg-gray-50">
                <img
                  src={`${domain}${image}`}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
