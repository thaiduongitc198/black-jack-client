import Phaser from "phaser";

export default class UIButton extends Phaser.GameObjects.Image {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    callback: () => void
  ) {
    super(scene, x, y, key);

    //Thêm nút button vào screen
    scene.add.existing(this);

    //Cho phép tương tác
    this.setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        callback();
      })
      .on("poiterover", () => {
        this.setTint(0xaaaaaa);
      })
      .on("pointerout", () => {
        this.clearTint();
      });
  }
}
