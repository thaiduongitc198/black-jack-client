import Phaser from "phaser";
import UIButton from "../Util/UIButton";
import { MS_BUTTON } from "../Util/Enum";

export default class MainScreen extends Phaser.Scene {
  constructor() {
    super({ key: "MainScreen" });
  }

  preload() {
    //Background
    this.load.image("background", "/assets/background/background.png");

    //Button chip
    this.load.image("chip_1", "/assets/button/chip_1.png");
    this.load.image("chip_5", "/assets/button/chip_5.png");
    this.load.image("chip_10", "/assets/button/chip_10.png");
    this.load.image("chip_25", "/assets/button/chip_25.png");
    this.load.image("chip_50", "/assets/button/chip_50.png");
    this.load.image("chip_100", "/assets/button/chip_100.png");

    //Button
    this.load.image("btnInfo", "/assets/button/btn_info_sound.png");
    this.load.image("btnInfoPress", "/assets/button/btn_info_press.png");
    this.load.image("btnSound", "/assets/button/btn_sound_3.png");
    this.load.image("btnSoundPress", "/assets/button/btn_sound_press.png");
    this.load.image("btnCancel", "/assets/button/btn_cancel_bets_0.png");
    this.load.image("btnCancelPress", "/assets/button/btn_cancel_bets_1.png");
    this.load.image("btnDouble", "/assets/button/btn_double_bets_0.png");
    this.load.image("btnDoublePress", "/assets/button/btn_double_bets_1.png");
    this.load.image("btnRepeat", "/assets/button/btn_repeat_bets_0.png");
    this.load.image("btnRepeatPress", "/assets/button/btn_repeat_bets_1.png");
    this.load.image("btnUndo", "/assets/button/btn_undo_bet_0.png");
    this.load.image("btnUndoPress", "/assets/button/btn_undo_bet_1.png");
    this.load.image("btnBingoLive", "/assets/button/bingo_live.png");
    this.load.image("btnChip1", "/assets/button/chip_1.png");
    this.load.image("btnChip5", "/assets/button/chip_5.png");
    this.load.image("btnChip10", "/assets/button/chip_10.png");
    this.load.image("btnChip25", "/assets/button/chip_25.png");
    this.load.image("btnChip50", "/assets/button/chip_50.png");
    this.load.image("btnChip100", "/assets/button/chip_100.png");
    this.load.image("btnChipSelect", "/assets/button/chip_selected.png");
    this.load.image("btnArrow", "/assets/button/arrow.png");
  }

  create() {
    let bg = this.add.image(0, 0, "background").setOrigin(0, 0);

    //Chỉnh sửa size của trang web
    const w = Number(this.sys.game.config.width);
    const h = Number(this.sys.game.config.height);
    bg.displayWidth = w;
    bg.displayHeight = h;
    let x = 300;
    let y = h - 60;
    let distance = 150;
    let distanceBetweenTwoChip = 35;
    let arrButton: UIButton[] = [];
    let btnPress: Phaser.GameObjects.Image | null = null;

    //Mặc định chọn chip 1
    let btnSelected: Phaser.GameObjects.Image = this.add.image((x + (distance * 6) + distanceBetweenTwoChip) - 6, y - 1, "btnChipSelect");
    btnSelected.setScale(1.05,1.05);
    let btnArrow: Phaser.GameObjects.Image = this.add.image((x + (distance * 6) + distanceBetweenTwoChip) - 6, y + 55, "btnArrow");
    let indexSelectedOld:number = MS_BUTTON.MSBTN_CHIP_1;

    for (let i = 0; i < MS_BUTTON.MSBTN_COUNT; i++) {
      switch (i) {
        case MS_BUTTON.MSBTN_INFO:
          {
            arrButton.push(new UIButton(this, x, y, "btnInfo", () => {}));

            arrButton[MS_BUTTON.MSBTN_INFO].on("pointerdown", () => {
              btnPress = this.add.image(x, y - 30, "btnInfoPress");
            });

            arrButton[MS_BUTTON.MSBTN_INFO].on("pointerup", () => {
              if (btnPress) {
                btnPress.destroy();
                btnPress = null;
              }
            });

            arrButton[MS_BUTTON.MSBTN_INFO].on("pointerout", () => {
              if (btnPress) {
                btnPress.destroy();
                btnPress = null;
              }
            });
          }
          break;
        case MS_BUTTON.MSBTN_SOUND_BETS:
          {
            arrButton.push(new UIButton(this, x, y + 10, "btnSound", () => {}));
            arrButton[MS_BUTTON.MSBTN_SOUND_BETS].setScale(0.7, 0.7);

            arrButton[MS_BUTTON.MSBTN_SOUND_BETS].on("pointerdown", () => {
              btnPress = this.add.image(x - 2, y + 30, "btnSoundPress");
            });

            arrButton[MS_BUTTON.MSBTN_SOUND_BETS].on("pointerup", () => {
              if (btnPress) {
                btnPress.destroy();
                btnPress = null;
              }
            });

            arrButton[MS_BUTTON.MSBTN_SOUND_BETS].on("pointerout", () => {
              if (btnPress) {
                btnPress.destroy();
                btnPress = null;
              }
            });
          }
          break;
        case MS_BUTTON.MSBTN_BINGO_LIVE:
          {
            arrButton.push(
              new UIButton(
                this,
                x + distance,
                y,
                "btnBingoLive",
                () => {}
              )
            );

            arrButton[MS_BUTTON.MSBTN_BINGO_LIVE].on("pointerdown", () => {
              btnPress = this.add.image(
                x + distance,
                y,
                "btnUndoPress"
              );
            });

            arrButton[MS_BUTTON.MSBTN_BINGO_LIVE].on("pointerup", () => {
              if (btnPress) {
                btnPress.destroy();
                btnPress = null;
              }
            });

            arrButton[MS_BUTTON.MSBTN_BINGO_LIVE].on("pointerout", () => {
              if (btnPress) {
                btnPress.destroy();
                btnPress = null;
              }
            });
          }
          break;
        case MS_BUTTON.MSBTN_UNDO_BETS:
          {
            arrButton.push(
              new UIButton(this, x + distance * 2, y, "btnUndo", () => {})
            );

            arrButton[MS_BUTTON.MSBTN_UNDO_BETS].on("pointerdown", () => {
              btnPress = this.add.image(
                x + distance * 2,
                y,
                "btnUndoPress"
              );
              console.log(2222, ">>>>", btnPress);
            });

            arrButton[MS_BUTTON.MSBTN_UNDO_BETS].on("pointerup", () => {
              if (btnPress) {
                btnPress.destroy();
                btnPress = null;
              }
            });
            
            arrButton[MS_BUTTON.MSBTN_UNDO_BETS].on("pointerout", () => {
              if (btnPress) {
                btnPress.destroy();
                btnPress = null;
              }
            });
          }
          break;
        case MS_BUTTON.MSBTN_CANCEL_BETS:
          {
            arrButton.push(
              new UIButton(
                this,
                x + distance * 3,
                y,
                "btnCancel",
                () => {}
              )
            );

            arrButton[MS_BUTTON.MSBTN_CANCEL_BETS].on("pointerdown", () => {
              btnPress = this.add.image(
                x + distance * 3,
                y,
                "btnCancelPress"
              );
              console.log(111, ">>>>", btnPress);
            });

            arrButton[MS_BUTTON.MSBTN_CANCEL_BETS].on("pointerup", () => {
              if (btnPress) {
                btnPress.destroy();
                btnPress = null;
              }
            });

            arrButton[MS_BUTTON.MSBTN_CANCEL_BETS].on("pointerout", () => {
              if (btnPress) {
                btnPress.destroy();
                btnPress = null;
              }
            });
          }
          break;
        case MS_BUTTON.MSBTN_DOUBLE_BETS:
          {
            arrButton.push(
              new UIButton(
                this,
                x + distance * 4,
                y,
                "btnDouble",
                () => {}
              )
            );

            arrButton[MS_BUTTON.MSBTN_DOUBLE_BETS].on("pointerdown", () => {
              btnPress = this.add.image(
                x + distance * 4,
                y,
                "btnDoublePress"
              );
            });

            arrButton[MS_BUTTON.MSBTN_DOUBLE_BETS].on("pointerup", () => {
              if (btnPress) {
                btnPress.destroy();
                btnPress = null;
              }
            });

            arrButton[MS_BUTTON.MSBTN_DOUBLE_BETS].on("pointerout", () => {
              if (btnPress) {
                btnPress.destroy();
                btnPress = null;
              }
            });
          }
          break;
        case MS_BUTTON.MSBTN_REPEAT_BETS:
          {
            arrButton.push(
              new UIButton(
                this,
                x + distance * 5,
                y,
                "btnRepeat",
                () => {}
              )
            );

            arrButton[MS_BUTTON.MSBTN_REPEAT_BETS].on("pointerdown", () => {
              btnPress = this.add.image(
                x + distance * 5,
                y,
                "btnRepeatPress"
              );
            });

            arrButton[MS_BUTTON.MSBTN_REPEAT_BETS].on("pointerup", () => {
              if (btnPress) {
                btnPress.destroy();
                btnPress = null;
              }
            });

            arrButton[MS_BUTTON.MSBTN_REPEAT_BETS].on("pointerout", () => {
              if (btnPress) {
                btnPress.destroy();
                btnPress = null;
              }
            });
          }
          break;
        case MS_BUTTON.MSBTN_CHIP_1:
          {
            const nX = (x + (distance * 6) + distanceBetweenTwoChip);
            arrButton.push(new UIButton(this, nX, y + 5, "btnChip1", () => { }));
            arrButton[MS_BUTTON.MSBTN_CHIP_1].on("pointerdown", () => {
              if (indexSelectedOld != MS_BUTTON.MSBTN_CHIP_1)
              {
                arrButton[indexSelectedOld].setY(y + 12);
                arrButton[MS_BUTTON.MSBTN_CHIP_1].setY(y + 5);
                btnSelected.setX(nX - 6);
                btnArrow.setX(nX - 6);
                indexSelectedOld = MS_BUTTON.MSBTN_CHIP_1;
              }
            });
          }
          break;
        case MS_BUTTON.MSBTN_CHIP_5:
          {
            const nX = (x + (distance * 6) + distanceBetweenTwoChip * 4);
            arrButton.push(new UIButton(this, nX, y + 12,"btnChip5",() => {}));
            arrButton[MS_BUTTON.MSBTN_CHIP_5].on("pointerdown", () => {
              if (indexSelectedOld != MS_BUTTON.MSBTN_CHIP_5)
              {
                arrButton[indexSelectedOld].setY(y + 12);
                arrButton[MS_BUTTON.MSBTN_CHIP_5].setY(y + 5);
                btnSelected.setX(nX - 6);
                btnArrow.setX(nX - 6);
                indexSelectedOld = MS_BUTTON.MSBTN_CHIP_5;
              }
            });
          }
          break;
        case MS_BUTTON.MSBTN_CHIP_10:
          {
            const nX = (x + (distance * 6) + distanceBetweenTwoChip * 7);
            arrButton.push(new UIButton(this, nX, y + 12,"btnChip10",() => {}));
            arrButton[MS_BUTTON.MSBTN_CHIP_10].on("pointerdown", () => {
              if (indexSelectedOld != MS_BUTTON.MSBTN_CHIP_10)
              {
                arrButton[indexSelectedOld].setY(y + 12);
                arrButton[MS_BUTTON.MSBTN_CHIP_10].setY(y + 5);
                btnSelected.setX(nX - 6);
                btnArrow.setX(nX - 6);
                indexSelectedOld = MS_BUTTON.MSBTN_CHIP_10;
              }
            });
          }
          break;
        case MS_BUTTON.MSBTN_CHIP_25:
          {
            const nX = (x + (distance * 6) + distanceBetweenTwoChip * 10);
            arrButton.push(new UIButton(this, nX, y + 12,"btnChip25",() => {}));
            arrButton[MS_BUTTON.MSBTN_CHIP_25].on("pointerdown", () => {
              if (indexSelectedOld != MS_BUTTON.MSBTN_CHIP_25)
              {
                arrButton[indexSelectedOld].setY(y + 12);
                arrButton[MS_BUTTON.MSBTN_CHIP_25].setY(y + 5);
                btnSelected.setX(nX - 6);
                btnArrow.setX(nX - 6);
                indexSelectedOld = MS_BUTTON.MSBTN_CHIP_25;
              }
            });
          }
          break;
        case MS_BUTTON.MSBTN_CHIP_50:
          {
            const nX = (x + (distance * 6) + distanceBetweenTwoChip * 13);
            arrButton.push(new UIButton(this, nX, y + 12,"btnChip50",() => {}));
            arrButton[MS_BUTTON.MSBTN_CHIP_50].on("pointerdown", () => {
              if (indexSelectedOld != MS_BUTTON.MSBTN_CHIP_50)
              {
                arrButton[indexSelectedOld].setY(y + 12);
                arrButton[MS_BUTTON.MSBTN_CHIP_50].setY(y + 5);
                btnSelected.setX(nX - 6);
                btnArrow.setX(nX - 6);
                indexSelectedOld = MS_BUTTON.MSBTN_CHIP_50;
              }
            });
          }
          break;
        case MS_BUTTON.MSBTN_CHIP_100:
          {
            //arrButton.push(new UIButton(this, (x + (distance * 6) + distanceBetweenTwoChip * 16), y + 12,"btnChip100",() => {}));

            const nX = (x + (distance * 6) + distanceBetweenTwoChip * 16);
            arrButton.push(new UIButton(this, nX, y + 12,"btnChip100",() => {}));
            arrButton[MS_BUTTON.MSBTN_CHIP_100].on("pointerdown", () => {
              if (indexSelectedOld != MS_BUTTON.MSBTN_CHIP_100)
              {
                arrButton[indexSelectedOld].setY(y + 12);
                arrButton[MS_BUTTON.MSBTN_CHIP_100].setY(y + 5);
                btnSelected.setX(nX - 6);
                btnArrow.setX(nX - 6);
                indexSelectedOld = MS_BUTTON.MSBTN_CHIP_100;
              }
            });
          }
          break;

        default:
          break;
      }
    }
  }
}
