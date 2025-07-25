import { UserAnswers } from "./data/books-data";

interface UserPreferencesDisplayProps {
  userAnswers: UserAnswers;
}

export default function UserPreferencesDisplay({
  userAnswers,
}: UserPreferencesDisplayProps) {
  const getOccasionLabel = (occasion: string) => {
    const labels: Record<string, string> = {
      valentine: "Valentine's Day",
      birthday: "Birthday",
      anniversary: "Anniversary",
      wedding: "Wedding",
      graduation: "Graduation",
      christmas: "Christmas",
      easter: "Easter",
      halloween: "Halloween",
    };
    return labels[occasion] || occasion;
  };

  const getRelationshipLabel = (relationship: string) => {
    const labels: Record<string, string> = {
      couple: "Couple",
      family: "Family",
      friends: "Friends",
      "parent-child": "Parent & Child",
      siblings: "Siblings",
    };
    return labels[relationship] || relationship;
  };

  const getThemeLabel = (theme: string) => {
    const labels: Record<string, string> = {
      romantic: "Romantic",
      adventure: "Adventure",
      fantasy: "Fantasy",
      "sci-fi": "Sci-Fi",
      nature: "Nature",
      urban: "Urban",
    };
    return labels[theme] || theme;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-azalove-100">
      <h2 className="text-lg font-semibold mb-4 text-royal-800">
        Your Selections:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amaranth-50 to-amaranth-100 p-3 rounded-lg border border-amaranth-200">
          <p className="text-sm text-amaranth-700">Occasion</p>
          <p className="font-semibold text-amaranth-800">
            {getOccasionLabel(userAnswers.occasion)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-azalove-50 to-azalove-100 p-3 rounded-lg border border-azalove-200">
          <p className="text-sm text-azalove-700">Relationship</p>
          <p className="font-semibold text-azalove-800">
            {getRelationshipLabel(userAnswers.relationship)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-royal-50 to-royal-100 p-3 rounded-lg border border-royal-200">
          <p className="text-sm text-royal-700">Theme</p>
          <p className="font-semibold text-royal-800">
            {getThemeLabel(userAnswers.theme)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-cream-100 to-cream-200 p-3 rounded-lg border border-cream-300">
          <p className="text-sm text-cream-800">Style</p>
          <p className="font-semibold text-cream-900">{userAnswers.style}</p>
        </div>
      </div>
    </div>
  );
}
