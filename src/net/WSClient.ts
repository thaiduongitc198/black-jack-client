export type WSStatus = 'idle'|'connecting'|'open'|'closed'|'error'
export interface WSClientOptions {
  url: string
  debug?: boolean
  onOpen?: () => void
  onClose?: (ev: CloseEvent) => void
  onError?: (ev: Event) => void
  onMessage?: (data:any) => void
  protocols?: string | string[]
}
export class WSClient {
  private ws?: WebSocket
  private opts: WSClientOptions
  public status: WSStatus = 'idle'
  constructor(opts: WSClientOptions){ this.opts = opts }
  connect(){
    if(this.status==='open'||this.status==='connecting') return
    this.status='connecting'
    this.ws = new WebSocket(this.opts.url, this.opts.protocols ?? [])
    if(this.opts.debug) console.log('[WS] connecting', this.opts.url)
    this.ws.onopen = ()=>{ this.status='open'; this.opts.onOpen&&this.opts.onOpen() }
    this.ws.onclose = (ev)=>{ this.status='closed'; this.opts.onClose&&this.opts.onClose(ev) }
    this.ws.onerror = (ev)=>{ this.status='error'; this.opts.onError&&this.opts.onError(ev) }
    this.ws.onmessage = (ev)=>{
      let p: any = ev.data; try{ p = JSON.parse(ev.data as string) }catch{}
      this.opts.onMessage&&this.opts.onMessage(p)
    }
  }
  send(obj:any){ if(this.ws && this.status==='open'){ this.ws.send(typeof obj==='string'?obj:JSON.stringify(obj)) } }
  close(code?:number, reason?:string){ this.ws?.close(code, reason) }
}
