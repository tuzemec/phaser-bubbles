import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    const { width, height } = this.scale;
    const centerW = width / 2;
    const centerH = height / 2;

    const pbWidth = 250;
    const pbHeight = 16;

    //  A simple progress bar. This is the outline of the bar.
    this.add
      .rectangle(centerW, centerH, pbWidth + 2, pbHeight + 2)
      .setStrokeStyle(2, 0xe0e1dd);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add
      .rectangle(centerW - pbWidth / 2, centerH, 1, pbHeight, 0x778da9)
      .setOrigin(0, 0.5);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress: number) => {
      bar.width = pbWidth * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("assets");

    this.load.image("logo", "logo.png");
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("MainMenu");
  }
}
