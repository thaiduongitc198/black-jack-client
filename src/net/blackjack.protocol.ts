export type BJClientMessage =
  | { action:'join'; roomId:string }
  | { action:'bet'; amount:number }
  | { action:'deal' }
  | { action:'hit' }
  | { action:'stand' }
  | { action:'double' }
  | { action:'split' }

export type BJServerMessage =
  | { type:'joined'; roomId:string }
  | { type:'deal'; cards:{ player:string[]; dealer:string[] } }
  | { type:'player-update'; handValue:number }
  | { type:'dealer-update'; handValue:number; revealHole?:boolean }
  | { type:'result'; outcome:'win'|'lose'|'push'; delta:number; balance:number }
  | { type:'error'; message:string }
