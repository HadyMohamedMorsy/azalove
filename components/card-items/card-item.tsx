import React from "react";

interface CardItemProps {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  showUnitPrice?: boolean;
  showQuantitySelect?: boolean;
  showRemoveButton?: boolean;
}

const CardItem: React.FC<CardItemProps> = ({
  id,
  name,
  image,
  price,
  quantity,
  showUnitPrice = false,
  showQuantitySelect = false,
  showRemoveButton = false,
}) => {
  return (
    <div className="flex justify-between py-3 border-b border-gray-100">
      <div className="flex gap-4">
        <div className="h-20 w-20 rounded bg-gray-100 overflow-hidden">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h3 className="font-medium text-checkout-text">{name}</h3>
          {showUnitPrice && (
            <p className="text-checkout-muted text-sm mt-1">
              Unit Price: ${price.toFixed(2)}
            </p>
          )}
          {showQuantitySelect && (
            <div className="mt-2 flex items-center">
              <span className="text-sm text-checkout-muted mr-2">Qty:</span>
              <select
                className="p-1 border rounded bg-white text-checkout-text text-sm"
                defaultValue={quantity}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-medium">${(price * quantity).toFixed(2)}</span>
        {showRemoveButton && (
          <button className="text-sm text-red-500 mt-2 hover:text-red-700">
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default CardItem;
