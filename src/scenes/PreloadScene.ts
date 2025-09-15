import Phaser from 'phaser'
export class PreloadScene extends Phaser.Scene {
  constructor(){ super('Preload') }
  preload(){
    this.load.image('btn', 'public/images/card.png') // dùng card làm nền nút tạm
    this.load.image('chip', 'public/images/chip.png')
    this.load.image('card', 'public/images/card.png')
    this.load.image('ball', 'public/images/ball.png')
  }
  create(){ this.scene.start('Table') }
}
