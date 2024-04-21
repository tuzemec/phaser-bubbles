import { Scene } from "phaser";
import GameCircle from "../objects/GameCircle";

export class Game extends Scene {
  score: number;
  scoreText: Phaser.GameObjects.Text;
  circles: Phaser.GameObjects.Group;

  constructor() {
    super("Game");
  }

  create() {
    this.score = 0;

    this.scoreText = this.add.text(4, 4, `Score: ${this.score}`, {
      fontFamily: "Arial",
      fontSize: 14,
      color: "#E0E1DD",
    });

    this.circles = this.add.group();
    this.circles.createMultiple({
      key: "circles",
      classType: GameCircle,
      quantity: 15,
      active: false,
      visible: false,
    });

    this.spawnCircle();
  }

  spawnCircle() {
    this.circles.getFirstDead().spawn();
  }

  updateScore() {
    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  gameOver() {
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start("GameOver", { score: this.score });
      },
    );

    this.cameras.main.fade(400, 200, 50, 50);
  }
}
