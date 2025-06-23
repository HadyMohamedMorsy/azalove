import { Card } from "@/components/ui/card";
import { FeatureCategory, FeatureOption } from "@/types/avatar";

interface FeatureGridProps {
  category: FeatureCategory;
  options: FeatureOption[];
  selectedFeature: string;
  onFeatureSelect: (featureId: string) => void;
}

const FeatureGrid = ({
  category,
  options,
  selectedFeature,
  onFeatureSelect,
}: FeatureGridProps) => {
  const renderFeaturePreview = (option: FeatureOption) => {
    return (
      <div className="w-16 h-16 flex items-center justify-center">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          className="transition-all duration-200"
        >
          {category === "faceShape" && (
            <>
              {option.id === "round" && (
                <ellipse
                  cx="30"
                  cy="30"
                  rx="24"
                  ry="26"
                  fill="#F4C2A1"
                  stroke="#E8A87C"
                  strokeWidth="1"
                />
              )}
              {option.id === "oval" && (
                <ellipse
                  cx="30"
                  cy="30"
                  rx="21"
                  ry="27"
                  fill="#F4C2A1"
                  stroke="#E8A87C"
                  strokeWidth="1"
                />
              )}
              {option.id === "square" && (
                <rect
                  x="9"
                  y="7"
                  width="42"
                  height="45"
                  rx="6"
                  fill="#F4C2A1"
                  stroke="#E8A87C"
                  strokeWidth="1"
                />
              )}
              {option.id === "heart" && (
                <path
                  d="M15 24 Q15 12 30 15 Q45 12 45 24 L45 36 Q45 48 30 51 Q15 48 15 36 Z"
                  fill="#F4C2A1"
                  stroke="#E8A87C"
                  strokeWidth="1"
                />
              )}
            </>
          )}

          {category === "eyes" && (
            <>
              {option.id === "normal" && (
                <g>
                  <ellipse
                    cx="20"
                    cy="30"
                    rx="4"
                    ry="3"
                    fill="white"
                    stroke="#333"
                    strokeWidth="0.5"
                  />
                  <ellipse
                    cx="40"
                    cy="30"
                    rx="4"
                    ry="3"
                    fill="white"
                    stroke="#333"
                    strokeWidth="0.5"
                  />
                  <circle cx="20" cy="30" r="2" fill="#4A90E2" />
                  <circle cx="40" cy="30" r="2" fill="#4A90E2" />
                </g>
              )}
              {option.id === "large" && (
                <g>
                  <ellipse
                    cx="20"
                    cy="30"
                    rx="5"
                    ry="4"
                    fill="white"
                    stroke="#333"
                    strokeWidth="0.5"
                  />
                  <ellipse
                    cx="40"
                    cy="30"
                    rx="5"
                    ry="4"
                    fill="white"
                    stroke="#333"
                    strokeWidth="0.5"
                  />
                  <circle cx="20" cy="30" r="3" fill="#4A90E2" />
                  <circle cx="40" cy="30" r="3" fill="#4A90E2" />
                </g>
              )}
              {option.id === "small" && (
                <g>
                  <ellipse
                    cx="20"
                    cy="30"
                    rx="3"
                    ry="2"
                    fill="white"
                    stroke="#333"
                    strokeWidth="0.5"
                  />
                  <ellipse
                    cx="40"
                    cy="30"
                    rx="3"
                    ry="2"
                    fill="white"
                    stroke="#333"
                    strokeWidth="0.5"
                  />
                  <circle cx="20" cy="30" r="1.5" fill="#4A90E2" />
                  <circle cx="40" cy="30" r="1.5" fill="#4A90E2" />
                </g>
              )}
            </>
          )}

          {category === "nose" && (
            <>
              {option.id === "normal" && (
                <path
                  d="M28 32 Q30 33 32 32 Q31 35 30 36 Q29 35 28 32"
                  fill="#E8A87C"
                  stroke="#D4956B"
                  strokeWidth="0.5"
                />
              )}
              {option.id === "small" && (
                <path
                  d="M29 32 Q30 33 31 32 Q30.5 34 30 35 Q29.5 34 29 32"
                  fill="#E8A87C"
                  stroke="#D4956B"
                  strokeWidth="0.5"
                />
              )}
              {option.id === "large" && (
                <path
                  d="M27 31 Q30 35 33 31 Q32 37 30 39 Q28 37 27 31"
                  fill="#E8A87C"
                  stroke="#D4956B"
                  strokeWidth="0.5"
                />
              )}
            </>
          )}

          {category === "mouth" && (
            <>
              {option.id === "smile" && (
                <path
                  d="M22 40 Q30 44 38 40"
                  stroke="#D4956B"
                  strokeWidth="1.5"
                  fill="none"
                />
              )}
              {option.id === "neutral" && (
                <line
                  x1="25"
                  y1="41"
                  x2="35"
                  y2="41"
                  stroke="#D4956B"
                  strokeWidth="1.5"
                />
              )}
              {option.id === "small" && (
                <ellipse
                  cx="30"
                  cy="41"
                  rx="2"
                  ry="1"
                  fill="#E8A87C"
                  stroke="#D4956B"
                  strokeWidth="0.5"
                />
              )}
            </>
          )}

          {category === "hair" && (
            <>
              {option.id === "short" && (
                <path
                  d="M9 21 Q9 6 30 4.5 Q51 6 51 21 Q51 12 45 10.5 Q39 9 30 9 Q21 9 15 10.5 Q9 12 9 21"
                  fill="#8B4513"
                  stroke="#654321"
                  strokeWidth="0.5"
                />
              )}
              {option.id === "long" && (
                <g>
                  <path
                    d="M7 19 Q7 4 30 3 Q53 4 53 19 Q53 10 47 8 Q41 7 30 7 Q19 7 13 8 Q7 10 7 19"
                    fill="#8B4513"
                    stroke="#654321"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M6 21 Q4 36 7 51 Q10 54 13 52 Q12 39 13 24"
                    fill="#8B4513"
                    stroke="#654321"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M54 21 Q56 36 53 51 Q50 54 47 52 Q48 39 47 24"
                    fill="#8B4513"
                    stroke="#654321"
                    strokeWidth="0.5"
                  />
                </g>
              )}
              {option.id === "curly" && (
                <g>
                  <circle
                    cx="18"
                    cy="15"
                    r="4.5"
                    fill="#8B4513"
                    stroke="#654321"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="24"
                    cy="10"
                    r="5.4"
                    fill="#8B4513"
                    stroke="#654321"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="30"
                    cy="9"
                    r="6"
                    fill="#8B4513"
                    stroke="#654321"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="36"
                    cy="10"
                    r="5.4"
                    fill="#8B4513"
                    stroke="#654321"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="42"
                    cy="15"
                    r="4.5"
                    fill="#8B4513"
                    stroke="#654321"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="15"
                    cy="21"
                    r="3.6"
                    fill="#8B4513"
                    stroke="#654321"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="45"
                    cy="21"
                    r="3.6"
                    fill="#8B4513"
                    stroke="#654321"
                    strokeWidth="0.5"
                  />
                </g>
              )}
            </>
          )}

          {category === "accessories" && (
            <>
              {option.id === "none" && (
                <text
                  x="30"
                  y="35"
                  textAnchor="middle"
                  className="text-xs fill-gray-400"
                >
                  None
                </text>
              )}
              {option.id === "glasses" && (
                <g>
                  <ellipse
                    cx="20"
                    cy="30"
                    rx="8"
                    ry="6"
                    fill="none"
                    stroke="#333"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="40"
                    cy="30"
                    rx="8"
                    ry="6"
                    fill="none"
                    stroke="#333"
                    strokeWidth="2"
                  />
                  <line
                    x1="28"
                    y1="30"
                    x2="32"
                    y2="30"
                    stroke="#333"
                    strokeWidth="2"
                  />
                </g>
              )}
              {option.id === "hat" && (
                <g>
                  <ellipse
                    cx="30"
                    cy="15"
                    rx="20"
                    ry="8"
                    fill="#4A90E2"
                    stroke="#2E5C8A"
                    strokeWidth="1"
                  />
                  <ellipse
                    cx="30"
                    cy="10"
                    rx="15"
                    ry="6"
                    fill="#4A90E2"
                    stroke="#2E5C8A"
                    strokeWidth="1"
                  />
                </g>
              )}
            </>
          )}
        </svg>
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Choose{" "}
        {category === "faceShape"
          ? "Face Shape"
          : category === "eyes"
            ? "Eyes"
            : category === "nose"
              ? "Nose"
              : category === "mouth"
                ? "Mouth"
                : category === "hair"
                  ? "Hair"
                  : "Accessories"}
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {options.map((option) => (
          <Card
            key={option.id}
            className={`p-3 cursor-pointer transition-all duration-200 hover:scale-105 ${
              selectedFeature === option.id
                ? "ring-2 ring-purple-500 bg-purple-50 shadow-lg transform scale-105"
                : "hover:shadow-md bg-white/70"
            }`}
            onClick={() => onFeatureSelect(option.id)}
          >
            <div className="flex flex-col items-center gap-2">
              {renderFeaturePreview(option)}
              <span className="text-xs font-medium text-gray-700 text-center">
                {option.name}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
