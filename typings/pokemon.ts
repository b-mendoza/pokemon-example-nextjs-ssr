export type Pokemon = {
  id: number;
  name: Name;
  type: Type[];
  base: Base;
};

export type Base = {
  HP: number;
  Attack: number;
  Defense: number;
  'Sp. Attack': number;
  'Sp. Defense': number;
  Speed: number;
};

export type Name = {
  english: string;
  japanese: string;
  chinese: string;
  french: string;
};

export enum Type {
  Bug = 'Bug',
  Dark = 'Dark',
  Dragon = 'Dragon',
  Electric = 'Electric',
  Fairy = 'Fairy',
  Fighting = 'Fighting',
  Fire = 'Fire',
  Flying = 'Flying',
  Ghost = 'Ghost',
  Grass = 'Grass',
  Ground = 'Ground',
  Ice = 'Ice',
  Normal = 'Normal',
  Poison = 'Poison',
  Psychic = 'Psychic',
  Rock = 'Rock',
  Steel = 'Steel',
  Water = 'Water',
}
