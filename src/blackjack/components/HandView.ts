import Phaser from 'phaser'
import { CardView } from './CardView'
export class HandView extends Phaser.GameObjects.Container {
  private cards: CardView[] = []
  constructor(scene: Phaser.Scene, x:number, y:number){ super(scene, x, y); scene.add.existing(this) }
  addCard(delay:number=0){
    const idx = this.cards.length
    const c = new CardView(this.scene, idx*160, 0); c.setAlpha(0); this.add(c)
    this.scene.tweens.add({ targets:c, alpha:1, duration:250, delay })
    this.cards.push(c)
  }
  clear(){ this.cards.forEach(c=>c.destroy()); this.cards.length=0 }
}
