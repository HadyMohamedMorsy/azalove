import Image from "next/image";

const CardPlaceholder = ({
  title = "Your Cart",
  description = "Ready to find something amazing?",
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 pt-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Main Empty State Card */}
      <div className="relative mb-8 flex justify-center">
        <Image
          src="/media/empty-cart.png"
          alt="Empty Cart"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
};

export default CardPlaceholder;
