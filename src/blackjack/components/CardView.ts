import Phaser from 'phaser'
export class CardView extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x:number, y:number){
    super(scene, x, y, 'card'); scene.add.existing(this)
  }
}
