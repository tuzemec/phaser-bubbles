import type { Game } from "../scenes/Game";
const START_DURATION = 2000;
const MIN_DURATION = 200;
const RADIUS_MIN = 40;
const RADIUS_MAX = 60;
const FADEAWAY_TIME = 400;
const COLOR = 0xf77f00;
const SCORE_Q = 75;

export default class GameCircle extends Phaser.GameObjects.Container {
  declare scene: Game;
  progress: Phaser.GameObjects.Graphics;
  tween: Phaser.Tweens.Tween;
  circle: Phaser.GameObjects.Arc;

  constructor(scene: Game) {
    super(scene);

    // interactivity
    this.setInteractive(
      new Phaser.Geom.Circle(0, 0, 0),
      Phaser.Geom.Circle.Contains,
    );
    this.on("pointerdown", this.hit, this);
    this.disableInteractive();

    this.progress = this.scene.add.graphics();
    this.circle = this.scene.add.arc(0, 0, 0, 0, 360, false, COLOR, 1);

    this.add(this.progress);
    this.add(this.circle);
  }

  spawn() {
    const { width, height } = this.scene.scale;

    // each bubble has custom size (radius) on spawn
    const size = Phaser.Math.Between(RADIUS_MIN, RADIUS_MAX);
    const duration = Math.max(
      START_DURATION - this.scene.score * SCORE_Q,
      MIN_DURATION,
    );

    this.setX(Phaser.Math.Between(size, width - size));
    this.setY(Phaser.Math.Between(size, height - size));
    this.setAlpha(0);
    this.setScale(0);
    this.setVisible(true);
    this.setActive(true);

    this.circle.setRadius(size);

    // reposition the hit area based on the size
    this.setInteractive();
    this.input?.hitArea.setTo(0, 0, size);

    this.tween = this.scene.tweens.addCounter({
      from: 1,
      to: 100,
      repeat: 0,
      yoyo: false,
      duration,
      onComplete: () => this.explode(),
      onUpdate: (tween) => {
        const v = tween.getValue();
        this.setAlpha(v / 100);
        this.setScale(v / 100);

        const p = (360 / 100) * v;

        // update the progress
        this.progress
          .clear()
          .lineStyle(5, 0xffffff)
          .beginPath()
          .arc(
            0,
            0,
            size,
            Phaser.Math.DegToRad(-90),
            Phaser.Math.DegToRad(-90 + p),
          )
          .strokePath();
      },
      callbackScope: this,
    });
  }

  hit() {
    this.scene.updateScore();
    this.tween.stop();
    this.disableInteractive();

    // move away
    this.scene.tweens.add({
      targets: this,
      duration: FADEAWAY_TIME,
      repeat: 0,
      yoyo: false,
      x: 55,
      y: 0,
      scale: 0,
      onComplete: () => {
        this.scene.spawnCircle();
        this.disable();
      },
      callbackScope: this,
    });
  }

  explode() {
    this.disable();
    this.scene.gameOver();
  }

  disable() {
    this.disableInteractive();
    this.tween.destroy();
    this.setVisible(false);
    this.setActive(false);
  }
}
