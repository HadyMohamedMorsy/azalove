import {
  AvatarFeatures,
  FeatureOption,
  FeatureCategory,
} from "../types/avatar";

export const defaultFeatures: AvatarFeatures = {
  faceShape: "round",
  eyes: "normal",
  nose: "normal",
  mouth: "smile",
  hair: "short",
  accessories: "none",
};

export const featureOptions: Record<FeatureCategory, FeatureOption[]> = {
  faceShape: [
    { id: "round", name: "Round", category: "faceShape" },
    { id: "oval", name: "Oval", category: "faceShape" },
    { id: "square", name: "Square", category: "faceShape" },
    { id: "heart", name: "Heart", category: "faceShape" },
  ],
  eyes: [
    { id: "normal", name: "Normal", category: "eyes" },
    { id: "large", name: "Large", category: "eyes" },
    { id: "small", name: "Small", category: "eyes" },
  ],
  nose: [
    { id: "normal", name: "Normal", category: "nose" },
    { id: "small", name: "Small", category: "nose" },
    { id: "large", name: "Large", category: "nose" },
  ],
  mouth: [
    { id: "smile", name: "Smile", category: "mouth" },
    { id: "neutral", name: "Neutral", category: "mouth" },
    { id: "small", name: "Small", category: "mouth" },
  ],
  hair: [
    { id: "short", name: "Short", category: "hair" },
    { id: "long", name: "Long", category: "hair" },
    { id: "curly", name: "Curly", category: "hair" },
  ],
  accessories: [
    { id: "none", name: "None", category: "accessories" },
    { id: "glasses", name: "Glasses", category: "accessories" },
    { id: "hat", name: "Hat", category: "accessories" },
  ],
};
