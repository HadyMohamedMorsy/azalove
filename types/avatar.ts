export type FeatureCategory =
  | "faceShape"
  | "eyes"
  | "nose"
  | "mouth"
  | "hair"
  | "accessories";

export interface AvatarFeatures {
  faceShape: string;
  eyes: string;
  nose: string;
  mouth: string;
  hair: string;
  accessories: string;
}

export interface FeatureOption {
  id: string;
  name: string;
  category: FeatureCategory;
}

export interface CharacterState {
  bodyColor: string;
  shoesColor: string;
  glassesColor: string;
  glassesType: string;
  hatColor: string;
  hatType: string;
  mustacheColor: string;
  mustacheType: string;
  chinColor: string;
  chinType: string;
  pantsColor: string;
  pantsType: string;
  clothingColor: string;
  clothingType: string;
  showShoes: boolean;
  showGlasses: boolean;
  showHat: boolean;
  showMustache: boolean;
  showChin: boolean;
  showPants: boolean;
  showClothing: boolean;
}
