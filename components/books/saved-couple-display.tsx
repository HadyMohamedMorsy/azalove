import CouplePreview from "@/components/avatars/couple-preview";
import { SavedCouple } from "@/hooks/use-saved-couples";

interface SavedCoupleDisplayProps {
  couple: SavedCouple;
}

export default function SavedCoupleDisplay({
  couple,
}: SavedCoupleDisplayProps) {
  return (
    <div className="mb-8 bg-white rounded-lg p-6 shadow-sm border border-azalove-100">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-royal-900 mb-2">
          Your Saved Couple: {couple.name}
        </h2>
        <p className="text-royal-600">
          Here are your characters! Choose a book cover to create your
          personalized story.
        </p>
      </div>

      {/* Display the couple */}
      <div className="flex justify-center">
        <CouplePreview
          character1={couple.character1}
          character2={couple.character2}
          size={200}
        />
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-royal-600">
          Created on {new Date(couple.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
