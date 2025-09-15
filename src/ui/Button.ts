import Phaser from 'phaser'
export class UIButton extends Phaser.GameObjects.Container {
  private bg: Phaser.GameObjects.Image
  private label: Phaser.GameObjects.Text
  private cb?: () => void
  constructor(scene: Phaser.Scene, x:number, y:number, text:string, onClick?:()=>void){
    super(scene, x, y)
    this.cb = onClick
    this.bg = scene.add.image(0,0,'btn').setInteractive({ useHandCursor: true })
    this.bg.setTint(0x1e293b)
    this.label = scene.add.text(0,0,text,{ color:'#fff', fontSize:'28px', fontFamily:'Arial', fontStyle:'bold' }).setOrigin(0.5)
    this.add([this.bg, this.label])
    this.setSize(this.bg.width, this.bg.height)
    this.bg.on('pointerdown',()=>this.bg.setTint(0x0f172a))
    this.bg.on('pointerup',()=>{ this.bg.setTint(0x1e293b); this.cb&&this.cb() })
    this.bg.on('pointerout',()=>this.bg.setTint(0x1e293b))
    scene.add.existing(this)
  }
}
