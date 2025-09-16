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
  skin: "light",
  eyebrows: "normal",
  ears: "normal",
  chin: "normal",
  cheeks: "normal",
  jawline: "normal",
  forehead: "normal",
  lips: "normal",
  eyelashes: "normal",
  facialHair: "none",
  accessories: "none",
};

export const featureOptions: Record<string, FeatureOption[]> = {
  faceShape: [
    { id: "round", name: "Round", value: "round", category: "faceShape" },
    { id: "oval", name: "Oval", value: "oval", category: "faceShape" },
    { id: "square", name: "Square", value: "square", category: "faceShape" },
    { id: "heart", name: "Heart", value: "heart", category: "faceShape" },
  ],
  eyes: [
    { id: "normal", name: "Normal", value: "normal", category: "eyes" },
    { id: "large", name: "Large", value: "large", category: "eyes" },
    { id: "small", name: "Small", value: "small", category: "eyes" },
  ],
  nose: [
    { id: "normal", name: "Normal", value: "normal", category: "nose" },
    { id: "small", name: "Small", value: "small", category: "nose" },
    { id: "large", name: "Large", value: "large", category: "nose" },
  ],
  mouth: [
    { id: "smile", name: "Smile", value: "smile", category: "mouth" },
    { id: "neutral", name: "Neutral", value: "neutral", category: "mouth" },
    { id: "small", name: "Small", value: "small", category: "mouth" },
  ],
  hair: [
    { id: "short", name: "Short", value: "short", category: "hair" },
    { id: "long", name: "Long", value: "long", category: "hair" },
    { id: "curly", name: "Curly", value: "curly", category: "hair" },
  ],
  accessories: [
    { id: "none", name: "None", value: "none", category: "accessories" },
    { id: "glasses", name: "Glasses", value: "glasses", category: "accessories" },
    { id: "hat", name: "Hat", value: "hat", category: "accessories" },
  ],
};
