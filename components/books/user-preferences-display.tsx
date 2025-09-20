import { UserAnswers } from "./data/books-data";

interface UserPreferencesDisplayProps {
  userAnswers: UserAnswers;
}

export default function UserPreferencesDisplay({
  userAnswers,
}: UserPreferencesDisplayProps) {
  const getOccasionLabel = (occasion: string) => {
    const labels: Record<string, string> = {
      valentine: "عيد الحب",
      birthday: "عيد الميلاد",
      anniversary: "الذكرى السنوية",
      wedding: "الزفاف",
      graduation: "التخرج",
      christmas: "عيد الميلاد",
      easter: "عيد الفصح",
      halloween: "الهالوين",
    };
    return labels[occasion] || occasion;
  };

  const getRelationshipLabel = (relationship: string) => {
    const labels: Record<string, string> = {
      couple: "زوجين",
      family: "عائلة",
      friends: "أصدقاء",
      "parent-child": "والد وطفل",
      siblings: "أشقاء",
    };
    return labels[relationship] || relationship;
  };

  const getThemeLabel = (theme: string) => {
    const labels: Record<string, string> = {
      romantic: "رومانسي",
      adventure: "مغامرة",
      fantasy: "خيال",
      "sci-fi": "خيال علمي",
      nature: "طبيعة",
      urban: "حضري",
    };
    return labels[theme] || theme;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-azalove-100">
      <h2 className="text-lg font-semibold mb-4 text-royal-800">اختياراتك:</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-cream-100 p-3 rounded-lg border border-amaranth-200">
          <p className="text-sm text-amaranth-700">المناسبة</p>
          <p className="font-semibold text-amaranth-800">
            {getOccasionLabel(userAnswers.occasion)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-azalove-50 to-azalove-100 p-3 rounded-lg border border-azalove-200">
          <p className="text-sm text-azalove-700">العلاقة</p>
          <p className="font-semibold text-azalove-800">
            {getRelationshipLabel(userAnswers.relationship)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-royal-50 to-royal-100 p-3 rounded-lg border border-royal-200">
          <p className="text-sm text-royal-700">الموضوع</p>
          <p className="font-semibold text-royal-800">
            {getThemeLabel(userAnswers.theme)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-cream-100 to-cream-200 p-3 rounded-lg border border-cream-300">
          <p className="text-sm text-cream-800">الأسلوب</p>
          <p className="font-semibold text-cream-900">{userAnswers.style}</p>
        </div>
      </div>
    </div>
  );
}
