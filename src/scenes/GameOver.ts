import { Scene } from "phaser";

type SceneData = {
  score: number;
};

export class GameOver extends Scene {
  score: number;

  constructor() {
    super("GameOver");
  }

  init(data: SceneData) {
    this.score = data.score;
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.fadeIn(400, 200, 50, 50);

    this.add
      .text(width / 2, height / 3, "Game Over", {
        fontFamily: "Arial Black",
        fontSize: 36,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 3 + 40, `Score: ${this.score ?? 0}`, {
        fontFamily: "Arial Black",
        fontSize: 18,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    const restart = this.add
      .text(width / 2, height / 2, "Restart Game", {
        fontFamily: "Arial Black",
        fontSize: 18,
        color: "#f77f00",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);
    restart.setInteractive().on("pointerdown", () => this.scene.start("Game"));

    const mainMenu = this.add
      .text(width / 2, height / 2 + 60, "Main Menu", {
        fontFamily: "Arial Black",
        fontSize: 18,
        color: "#f77f00",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    mainMenu
      .setInteractive()
      .on("pointerdown", () => this.scene.start("MainMenu"));
  }
}
