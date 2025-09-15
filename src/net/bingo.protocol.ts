export type BingoClientMessage =
  | { action:'lobby.list' }
  | { action:'room.join'; roomId:string }
  | { action:'ticket.buy'; roomId:string; count:number }
  | { action:'ticket.mark'; roomId:string; ticketId:string; cell:string }

export type BingoRoom = { roomId:string; name:string; startsAt?:number; ticketPrice?:number; prizeType?:string }

export type BingoServerMessage =
  | { type:'lobby.rooms'; rooms:BingoRoom[] }
  | { type:'room.synced'; roomId:string; players:number; tickets:any[]; drawHistory:number[]; patterns:string[] }
  | { type:'draw.number'; n:number; at?:number }
  | { type:'ticket.update'; ticketId:string; marks:string[] }
  | { type:'win'; ticketId:string; pattern:string; prize:number }
  | { type:'room.end'; winners:Array<{ticketId:string; prize:number}>; prizeBreakdown?:any }
  | { type:'error'; message:string }
