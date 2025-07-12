import { AvatarFeatures } from "@/types/avatar";

interface AvatarPreviewProps {
  features: AvatarFeatures;
  coverCharacters?: AvatarFeatures[];
  onRemoveFromCover?: (index: number) => void;
}

const AvatarPreview = ({
  features,
  coverCharacters = [],
  onRemoveFromCover,
}: AvatarPreviewProps) => {
  const renderAvatar = (
    avatarFeatures: AvatarFeatures,
    scale: number = 1,
    x: number = 75,
    y: number = 75
  ) => {
    return (
      <g transform={`scale(${scale})`}>
        {/* Face Shape */}
        {avatarFeatures.faceShape === "round" && (
          <ellipse
            cx={x}
            cy={y}
            rx={60 * scale}
            ry={64 * scale}
            fill="#F4C2A1"
            stroke="#E8A87C"
            strokeWidth="2"
          />
        )}
        {avatarFeatures.faceShape === "oval" && (
          <ellipse
            cx={x}
            cy={y}
            rx={53 * scale}
            ry={68 * scale}
            fill="#F4C2A1"
            stroke="#E8A87C"
            strokeWidth="2"
          />
        )}
        {avatarFeatures.faceShape === "square" && (
          <rect
            x={x - 52.5 * scale}
            y={y - 56.5 * scale}
            width={105 * scale}
            height={113 * scale}
            rx="15"
            fill="#F4C2A1"
            stroke="#E8A87C"
            strokeWidth="2"
          />
        )}
        {avatarFeatures.faceShape === "heart" && (
          <path
            d={`M${x - 37 * scale} ${y - 15 * scale} Q${x - 37 * scale} ${y - 45 * scale} ${x} ${y - 37 * scale} Q${x + 38 * scale} ${y - 45 * scale} ${x + 38 * scale} ${y - 15 * scale} L${x + 38 * scale} ${y + 15 * scale} Q${x + 38 * scale} ${y + 45 * scale} ${x} ${y + 53 * scale} Q${x - 37 * scale} ${y + 45 * scale} ${x - 37 * scale} ${y + 15 * scale} Z`}
            fill="#F4C2A1"
            stroke="#E8A87C"
            strokeWidth="2"
          />
        )}

        {/* Eyes */}
        {avatarFeatures.eyes === "normal" && (
          <g>
            <ellipse
              cx={x - 19 * scale}
              cy={y - 11 * scale}
              rx={9 * scale}
              ry={6 * scale}
              fill="white"
              stroke="#333"
              strokeWidth="1"
            />
            <ellipse
              cx={x + 19 * scale}
              cy={y - 11 * scale}
              rx={9 * scale}
              ry={6 * scale}
              fill="white"
              stroke="#333"
              strokeWidth="1"
            />
            <circle
              cx={x - 19 * scale}
              cy={y - 11 * scale}
              r={4.5 * scale}
              fill="#4A90E2"
            />
            <circle
              cx={x + 19 * scale}
              cy={y - 11 * scale}
              r={4.5 * scale}
              fill="#4A90E2"
            />
          </g>
        )}
        {/* Add other eye types... */}

        {/* Hair */}
        {avatarFeatures.hair === "short" && (
          <path
            d={`M${x - 52 * scale} ${y - 22 * scale} Q${x - 52 * scale} ${y - 60 * scale} ${x} ${y - 64 * scale} Q${x + 53 * scale} ${y - 60 * scale} ${x + 53 * scale} ${y - 22 * scale} Q${x + 53 * scale} ${y - 45 * scale} ${x + 38 * scale} ${y - 49 * scale} Q${x + 23 * scale} ${y - 52 * scale} ${x} ${y - 52 * scale} Q${x - 22 * scale} ${y - 52 * scale} ${x - 37 * scale} ${y - 49 * scale} Q${x - 52 * scale} ${y - 45 * scale} ${x - 52 * scale} ${y - 22 * scale}`}
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="1"
          />
        )}
        {/* Add other hair types... */}

        {/* Basic features for other categories */}
        {/* Nose */}
        <path
          d={`M${x - 4 * scale} ${y + 4 * scale} Q${x} ${y + 8 * scale} ${x + 4 * scale} ${y + 4 * scale} Q${x + 2 * scale} ${y + 11 * scale} ${x} ${y + 14 * scale} Q${x - 2 * scale} ${y + 11 * scale} ${x - 4 * scale} ${y + 4 * scale}`}
          fill="#E8A87C"
          stroke="#D4956B"
          strokeWidth="1"
        />

        {/* Mouth */}
        {avatarFeatures.mouth === "smile" && (
          <path
            d={`M${x - 11 * scale} ${y + 26 * scale} Q${x} ${y + 34 * scale} ${x + 11 * scale} ${y + 26 * scale}`}
            stroke="#D4956B"
            strokeWidth="2"
            fill="none"
          />
        )}

        {/* Accessories */}
        {avatarFeatures.accessories === "glasses" && (
          <g>
            <ellipse
              cx={x - 19 * scale}
              cy={y - 11 * scale}
              rx={16 * scale}
              ry={12 * scale}
              fill="none"
              stroke="#333"
              strokeWidth="2"
            />
            <ellipse
              cx={x + 19 * scale}
              cy={y - 11 * scale}
              rx={16 * scale}
              ry={12 * scale}
              fill="none"
              stroke="#333"
              strokeWidth="2"
            />
            <line
              x1={x - 3 * scale}
              y1={y - 11 * scale}
              x2={x + 3 * scale}
              y2={y - 11 * scale}
              stroke="#333"
              strokeWidth="2"
            />
          </g>
        )}
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* Cover Image Container */}
      <div className="relative w-80 h-80 bg-gradient-to-b from-sky-200 via-blue-100 to-green-100 rounded-lg overflow-hidden shadow-lg mb-6">
        {/* Fixed Background/Cover Image */}
        <div className="absolute inset-0">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 320 320"
            className="w-full h-full"
          >
            {/* Sky */}
            <rect
              x="0"
              y="0"
              width="320"
              height="160"
              fill="url(#skyGradient)"
            />
            {/* Ground */}
            <rect
              x="0"
              y="160"
              width="320"
              height="160"
              fill="url(#groundGradient)"
            />
            {/* Sun */}
            <circle cx="260" cy="60" r="30" fill="#FCD34D" opacity="0.8" />
            {/* Clouds */}
            <ellipse
              cx="80"
              cy="50"
              rx="25"
              ry="15"
              fill="white"
              opacity="0.7"
            />
            <ellipse
              cx="90"
              cy="45"
              rx="20"
              ry="12"
              fill="white"
              opacity="0.7"
            />
            <ellipse
              cx="200"
              cy="80"
              rx="30"
              ry="18"
              fill="white"
              opacity="0.6"
            />
            <ellipse
              cx="220"
              cy="75"
              rx="25"
              ry="15"
              fill="white"
              opacity="0.6"
            />

            {/* Define gradients */}
            <defs>
              <linearGradient
                id="skyGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#87CEEB" />
                <stop offset="100%" stopColor="#E0F6FF" />
              </linearGradient>
              <linearGradient
                id="groundGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#90EE90" />
                <stop offset="100%" stopColor="#228B22" />
              </linearGradient>
            </defs>

            {/* Characters on Cover */}
            {coverCharacters.map((character, index) => (
              <g key={index}>
                {renderAvatar(character, 0.4, 60 + index * 70, 240)}
                {/* Remove button for each character */}
                <circle
                  cx={85 + index * 70}
                  cy={215}
                  r="8"
                  fill="red"
                  className="cursor-pointer"
                  onClick={() => onRemoveFromCover?.(index)}
                />
                <text
                  x={85 + index * 70}
                  y={219}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  className="cursor-pointer pointer-events-none"
                >
                  ×
                </text>
              </g>
            ))}

            {/* Current Avatar Character positioned on the cover (preview) */}
            <g opacity="0.7">
              {renderAvatar(features, 0.6, 160, 220)}
              <text
                x="160"
                y="280"
                textAnchor="middle"
                fill="#333"
                fontSize="12"
              >
                Preview
              </text>
            </g>
          </svg>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Your Avatar
        </h3>
        <p className="text-gray-600 text-sm">
          Click "Add to Cover" to place your character on the cover image
        </p>
        {coverCharacters.length > 0 && (
          <p className="text-sm text-green-600 mt-1">
            {coverCharacters.length} character(s) on cover
          </p>
        )}
      </div>
    </div>
  );
};

export default AvatarPreview;
