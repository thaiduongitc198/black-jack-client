import Phaser from 'phaser'
import { UIButton } from '@/ui/Button'
import { State } from '@/core/State'
import type { BingoServerMessage, BingoClientMessage } from '@/net/bingo.protocol'
import { WSClient } from '@/net/WSClient'

export class BingoLiveRoomScene extends Phaser.Scene {
  private ws?: WSClient
  private drawText!: Phaser.GameObjects.Text

  constructor(){ super('BingoLiveRoom') }

  create(){
    const { width, height } = this.scale
    this.add.text(width*0.5, 60, 'BINGO LIVE', { color:'#e2e8f0', fontSize:'42px', fontFamily:'Arial', fontStyle:'bold' }).setOrigin(0.5)
    const backBtn = new UIButton(this, 120, 60, 'BACK', ()=>{ State.setMode('blackjack'); this.scene.start('Table') })
    backBtn.setScale(0.9)

    this.drawText = this.add.text(width*0.5, height*0.5, 'Waiting for numbers...', { color:'#fff', fontSize:'26px', align:'center' }).setOrigin(0.5)

    const url = (import.meta as any).env.VITE_WS_BINGO || 'ws://localhost:4001'
    this.ws = new WSClient({
      url, debug:true,
      onOpen: ()=>{ this.toast('Bingo Connected'); this.send({ action:'lobby.list' } as BingoClientMessage) },
      onMessage: (msg: BingoServerMessage)=>this.handleServer(msg),
      onClose: ()=>this.toast('Bingo Disconnected')
    }); this.ws.connect()
  }

  private send(msg: BingoClientMessage){ this.ws?.send(msg) }

  private handleServer(msg: BingoServerMessage){
    if(msg.type==='draw.number'){
      this.drawText.setText('Number: ' + msg.n)
      const ball = this.add.image(this.scale.width*0.5, this.scale.height*0.5 + 100, 'ball')
      ball.setScale(0.1)
      this.tweens.add({ targets: ball, scale: 1, duration: 300, ease: 'back.out', onComplete: ()=>{
        this.time.delayedCall(800, ()=>ball.destroy())
      }})
    }
  }

  private toast(text:string){
    const t = this.add.text(this.scale.width*0.5, this.scale.height*0.3, text, { color:'#fff', backgroundColor:'#0008', fontSize:'24px', padding:{x:12,y:8} }).setOrigin(0.5)
    this.time.delayedCall(1000, ()=>t.destroy())
  }
}
