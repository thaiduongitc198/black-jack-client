import Phaser from 'phaser'
import { BootScene } from './scenes/BootScene'
import { PreloadScene } from './scenes/PreloadScene'
import { TableScene } from './scenes/TableScene'
import { BingoLiveRoomScene } from './bingo/LiveRoomScene'
import MainScreen from './scenes/MainScreen'

class MyScene extends Phaser.Scene {
  constructor() {
    super({ key: "MyScene" });
  }
  create() {
    this.scene.start("MainScreen");
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  //backgroundColor: '#0b3b2e',
  // scale: { mode: Phaser.Scale.ENVELOP, autoCenter: Phaser.Scale.CENTER_BOTH, width: 1600, height: 720 },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  parent: 'app',
  //scene: [BootScene, PreloadScene, TableScene, BingoLiveRoomScene, MainScreen, MyScene],
  scene: [MainScreen, MyScene],
  render: { antialias: true }
}
new Phaser.Game(config);
// window.addEventListener('load', async () => {
//   try { /* @ts-ignore */ if (screen.orientation && screen.orientation.lock) await screen.orientation.lock('landscape') } catch {}
//   new Phaser.Game(config)
// })