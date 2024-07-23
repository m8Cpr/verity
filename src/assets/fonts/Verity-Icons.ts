export type VerityIconsId =
  | "cilinder"
  | "circle"
  | "cone"
  | "cube"
  | "prism"
  | "pyramid"
  | "sphere"
  | "square"
  | "triangle";

export type VerityIconsKey =
  | "Cilinder"
  | "Circle"
  | "Cone"
  | "Cube"
  | "Prism"
  | "Pyramid"
  | "Sphere"
  | "Square"
  | "Triangle";

export enum VerityIcons {
  Cilinder = "cilinder",
  Circle = "circle",
  Cone = "cone",
  Cube = "cube",
  Prism = "prism",
  Pyramid = "pyramid",
  Sphere = "sphere",
  Square = "square",
  Triangle = "triangle",
}

export const VERITY_ICONS_CODEPOINTS: { [key in VerityIcons]: string } = {
  [VerityIcons.Cilinder]: "61697",
  [VerityIcons.Circle]: "61698",
  [VerityIcons.Cone]: "61699",
  [VerityIcons.Cube]: "61700",
  [VerityIcons.Prism]: "61701",
  [VerityIcons.Pyramid]: "61702",
  [VerityIcons.Sphere]: "61703",
  [VerityIcons.Square]: "61704",
  [VerityIcons.Triangle]: "61705",
};
