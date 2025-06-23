
export type FeatureCategory = 'faceShape' | 'eyes' | 'nose' | 'mouth' | 'hair' | 'accessories';

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