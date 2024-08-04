export type VerityIconsId =
  | "cilinder"
  | "circle"
  | "cone"
  | "cube"
  | "github-mark-white"
  | "github-mark"
  | "prism"
  | "pyramid"
  | "raid"
  | "sphere"
  | "square"
  | "triangle";

export type VerityIconsKey =
  | "Cilinder"
  | "Circle"
  | "Cone"
  | "Cube"
  | "GithubMarkWhite"
  | "GithubMark"
  | "Prism"
  | "Pyramid"
  | "Raid"
  | "Sphere"
  | "Square"
  | "Triangle";

export enum VerityIcons {
  Cilinder = "cilinder",
  Circle = "circle",
  Cone = "cone",
  Cube = "cube",
  GithubMarkWhite = "github-mark-white",
  GithubMark = "github-mark",
  Prism = "prism",
  Pyramid = "pyramid",
  Raid = "raid",
  Sphere = "sphere",
  Square = "square",
  Triangle = "triangle",
}

export const VERITY_ICONS_CODEPOINTS: { [key in VerityIcons]: string } = {
  [VerityIcons.Cilinder]: "61697",
  [VerityIcons.Circle]: "61698",
  [VerityIcons.Cone]: "61699",
  [VerityIcons.Cube]: "61700",
  [VerityIcons.GithubMarkWhite]: "61701",
  [VerityIcons.GithubMark]: "61702",
  [VerityIcons.Prism]: "61703",
  [VerityIcons.Pyramid]: "61704",
  [VerityIcons.Raid]: "61705",
  [VerityIcons.Sphere]: "61706",
  [VerityIcons.Square]: "61707",
  [VerityIcons.Triangle]: "61708",
};
