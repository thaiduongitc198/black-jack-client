import Phaser from 'phaser'
export class ChipBar extends Phaser.GameObjects.Container {
  private bet=0
  private txt!: Phaser.GameObjects.Text
  constructor(scene: Phaser.Scene, x:number, y:number, onBetChanged?:(v:number)=>void){
    super(scene, x, y); scene.add.existing(this)
    this.txt = scene.add.text(0,-50,'Bet: 0',{ color:'#facc15', fontSize:'24px' }).setOrigin(0,0.5); this.add(this.txt)
    const values=[10,50,100]
    values.forEach((v,i)=>{
      const chip = scene.add.image(i*90,0,'chip').setInteractive({ useHandCursor:true })
      chip.on('pointerdown',()=>{ this.bet+=v; this.txt.setText('Bet: '+this.bet); onBetChanged&&onBetChanged(this.bet) })
      this.add(chip)
    })
  }
  reset(){ this.bet=0; this.txt.setText('Bet: 0') }
  getBet(){ return this.bet }
}
