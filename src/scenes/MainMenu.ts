import { type GameObjects, Scene } from "phaser";

export class MainMenu extends Scene {
  logo: GameObjects.Image;

  constructor() {
    super("MainMenu");
  }

  create() {
    const { width, height } = this.scale;
    const center = width / 2;

    this.logo = this.add.image(center, height / 4, "logo");
    this.logo.setScale(0.5);

    this.add
      .text(center, height / 2, "Click to start", {
        fontFamily: "Arial Black",
        fontSize: 18,
        color: "#E0E1DD",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    const bbl = this.add
      .text(center, height / 3 + 20, "Bubbles!", {
        fontFamily: "Arial Black",
        fontSize: 26,
        color: "#E0E1DD",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    this.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "cubic.in",
      onUpdate: (tween) => {
        const v = tween.getValue();
        bbl.setScale(1 + v);
      },
    });

    this.add
      .text(
        center,
        height - 60,
        "The simplest game that I was able to come up with.\n Tap on the bubbles before they burst.",
        {
          fontFamily: "Arial",
          fontSize: 12,
          color: "#E0E1DD",
          stroke: "#000000",
          strokeThickness: 4,
          align: "center",
        },
      )
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
