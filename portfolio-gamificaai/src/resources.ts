import { ImageFiltering, ImageSource, Loader, Sound } from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";

import sword from "./images/sword.png";
import logo from "./images/logo.png";
import Abobra from "./images/abobra.png";
import techgear from "./images/Techgear.jpg"
import edulingo from "./images/EduLingo.jpg"
import greentech from "./images/Greentech.jpg"

import pngTilesetPath from "./maps/Room_Builder_32x32.png?url"

import tsxParedesPath from "./maps/tileset_paredes.tsx?url"
import tsxGenericPath from "./maps/tileset_generic.tsx?url"
import tsxEstoquePath from "./maps/tileset_estoque.tsx?url"
import tsxBibliotecaPath from "./maps/tileset_biblioteca?url"

import tmxMapaPath from "./maps/showroom_map.tmx?url"

import playerSpritePath from "./sprites/Principal.png"
import recepcionistaSpritePath from "./sprites/Recepcionista.png"
import ritmada from "./sounds/ritmada_zelda.mp3"
export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  playerSpriteSheet: new ImageSource(playerSpritePath, {filtering:ImageFiltering.Pixel}),
  recepcionistaSpritePath: new ImageSource(playerSpritePath, {filtering:ImageFiltering.Pixel}),
  abobra: new ImageSource(Abobra),
  techgear: new ImageSource(techgear),
  edulingo: new ImageSource(edulingo),
  greentech: new ImageSource(greentech),
  ritmadaBGM: new Sound(ritmada),
  Mapa: new TiledResource(tmxMapaPath,

    {
    pathMap: [
      {path: "showroom_map.tmx", output: tmxMapaPath},
      {path: "Room_Builder_32x32.png", output: pngTilesetPath},
      {path: "tileset_paredes.tsx", output: tsxParedesPath},
      {path: "tileset_generic.tsx", output: tsxGenericPath},
      {path: "tileset_estoque.tsx", output: tsxEstoquePath},
      {path: "tileset_biblioteca.tsx", output: tsxBibliotecaPath},
    ]
  })
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
