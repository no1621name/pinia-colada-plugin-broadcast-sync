export const BROADCAST_CHANNEL_NAME = 'pinia-colada-plugin-broadcast-sync'

export interface BroadcastMessage<T = unknown> {
  type: string
  payload?: T
}

export class Broadcaster {
  private channel: BroadcastChannel | null = null

  constructor(private channelName: string) {}

  private getChannel() {
    if (!this.channel) {
      this.channel = new BroadcastChannel(this.channelName)
    }
    return this.channel
  }

  public send<T = unknown>(type: string, payload?: T) {
    const channel = this.getChannel()
    channel.postMessage({ type, payload })
  }

  public on<T = unknown>(targetType: string, callback: (payload: T) => void) {
    const handler = (event: MessageEvent<BroadcastMessage<T>>) => {
      if (event.data?.type === targetType) {
        callback(event.data.payload as T)
      }
    }

    const channel = this.getChannel()

    channel.addEventListener('message', handler)

    return () => {
      channel.removeEventListener('message', handler)
    }
  }
}
