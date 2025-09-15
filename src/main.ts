import Phaser from 'phaser'
import { BootScene } from './scenes/BootScene'
import { PreloadScene } from './scenes/PreloadScene'
import { TableScene } from './scenes/TableScene'
import { BingoLiveRoomScene } from './bingo/LiveRoomScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#0b3b2e',
  scale: { mode: Phaser.Scale.ENVELOP, autoCenter: Phaser.Scale.CENTER_BOTH, width: 1600, height: 720 },
  parent: 'app',
  scene: [BootScene, PreloadScene, TableScene, BingoLiveRoomScene],
  render: { antialias: true }
}

window.addEventListener('load', async () => {
  try { /* @ts-ignore */ if (screen.orientation && screen.orientation.lock) await screen.orientation.lock('landscape') } catch {}
  new Phaser.Game(config)
})