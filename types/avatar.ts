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
