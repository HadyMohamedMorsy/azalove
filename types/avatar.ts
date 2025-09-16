export interface CharacterLayer {
  bodyType: string;
  svg: string;
  color?: string;
  label?: string;
}

export interface CharacterState {
  Layer_2: CharacterLayer[];
  Layer_4: CharacterLayer[];
}

export interface CharacterSelection {
  activeCharacter: "Layer_2" | "Layer_4";
  activeBodyType: string;
  activeColor: string;
}

export interface FeatureOption {
  id: string;
  name: string;
  value: string;
  category?: string;
  svg?: string;
  color?: string;
}

export interface FeatureCategory {
  id: string;
  name: string;
  options: FeatureOption[];
}

export interface AvatarFeatures {
  faceShape: string;
  eyes: string;
  nose: string;
  mouth: string;
  hair: string;
  skin: string;
  eyebrows: string;
  ears: string;
  chin: string;
  cheeks: string;
  jawline: string;
  forehead: string;
  lips: string;
  eyelashes: string;
  facialHair: string;
  accessories: string;
}