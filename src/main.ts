import { Game, type Types } from "phaser";
import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

const height = 768;
const width = 412;
// const height = Math.min(window.innerHeight, 786);
// const width = Math.min(window.innerWidth, 412);

// colors:
// https://coolors.co/0d1b2a-1b263b-415a77-778da9-e0e1dd

const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width,
  height,
  parent: "game-container",
  backgroundColor: "#0D1B2A",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

export default new Game(config);
