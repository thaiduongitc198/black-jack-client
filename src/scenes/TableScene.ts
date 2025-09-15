import Phaser from 'phaser'
import { UIButton } from '@/ui/Button'
import { State } from '@/core/State'
import { ChipBar } from '@/blackjack/components/ChipBar'
import { HandView } from '@/blackjack/components/HandView'
import type { BJClientMessage, BJServerMessage } from '@/net/blackjack.protocol'
import { WSClient } from '@/net/WSClient'

export class TableScene extends Phaser.Scene {
  private balanceText!: Phaser.GameObjects.Text
  private playerHand!: HandView
  private dealerHand!: HandView
  private chipBar!: ChipBar
  private ws?: WSClient

  constructor(){ super('Table') }

  create(){
    const { width, height } = this.scale
    this.add.text(width*0.5, 40, 'BLACKJACK', { color:'#e2e8f0', fontSize:'42px', fontFamily:'Arial', fontStyle:'bold' }).setOrigin(0.5)
    this.balanceText = this.add.text(40, 24, 'Balance: ' + State.balance, { color:'#e2e8f0', fontSize:'24px' })

    this.dealerHand = new HandView(this, width*0.5 - 160, 200)
    this.playerHand = new HandView(this, width*0.5 - 160, 460)

    this.chipBar = new ChipBar(this, width - 320, height - 120)
    const bx = width*0.5 - 480, by = height - 80
    new UIButton(this, bx +   0, by, 'DEAL',  ()=>this.onAction({ action:'deal' } as BJClientMessage))
    new UIButton(this, bx + 250, by, 'HIT',   ()=>this.onAction({ action:'hit' } as BJClientMessage))
    new UIButton(this, bx + 500, by, 'STAND', ()=>this.onAction({ action:'stand' } as BJClientMessage))
    new UIButton(this, bx + 750, by, 'DOUBLE',()=>this.onAction({ action:'double' } as BJClientMessage))

    const bingoBtn = new UIButton(this, width - 160, 60, 'BINGO LIVE', ()=>{
      State.setMode('bingo'); this.scene.start('BingoLiveRoom')
    }); bingoBtn.setScale(0.9)

    const url = (import.meta as any).env.VITE_WS_URL || 'ws://localhost:3001'
    this.ws = new WSClient({
      url, debug:true,
      onOpen: ()=>{ this.toast('Connected'); this.ws?.send({ action:'join', roomId:'blackjack-1' }) },
      onMessage: (msg: BJServerMessage)=>this.handleServer(msg),
      onClose: ()=>this.toast('Disconnected')
    }); this.ws.connect()
  }

  private onAction(msg: BJClientMessage){
    if(msg.action==='deal'){
      const bet = this.chipBar.getBet()
      if(bet<=0) return this.toast('Please place a bet')
      this.ws?.send({ action:'bet', amount: bet })
    }
    this.ws?.send(msg)
  }

  private handleServer(msg: BJServerMessage){
    switch(msg.type){
      case 'deal':
        this.playerHand.clear(); this.dealerHand.clear()
        this.playerHand.addCard(0); this.playerHand.addCard(160)
        this.dealerHand.addCard(0); this.dealerHand.addCard(160)
        break
      case 'result':
        State.setBalance(msg.balance); this.balanceText.setText('Balance: '+State.balance)
        this.toast(msg.outcome.toUpperCase() + (msg.delta ? ` (${msg.delta>0?'+':''}${msg.delta})` : ''))
        this.chipBar.reset(); break
      case 'error': this.toast('Error: ' + msg.message); break
    }
  }

  private toast(text:string){
    const t = this.add.text(this.scale.width*0.5, this.scale.height*0.5, text, {
      color:'#fff', backgroundColor:'#0008', fontSize:'28px', padding:{x:12,y:8}
    }).setOrigin(0.5)
    this.time.delayedCall(1200, ()=>t.destroy())
  }
}
