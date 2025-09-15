export type GameMode = 'blackjack' | 'bingo'
class AppState {
  mode: GameMode = 'blackjack'
  roomId?: string
  balance = 1000
  setMode(m: GameMode){ this.mode=m }
  setRoom(r?: string){ this.roomId=r }
  setBalance(v: number){ this.balance=v }
}
export const State = new AppState()
