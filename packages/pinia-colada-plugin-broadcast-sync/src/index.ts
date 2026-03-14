import type { DataState, EntryKey, PiniaColadaPlugin } from '@pinia/colada'
import { Broadcaster } from './broadcaster'

export interface PiniaColadaPluginBroadcastSyncOptions {
  /**
   * The name of the broadcast channel to use.
   *
   * @default 'pinia-colada-plugin-broadcast-sync'
   */
  broadcastChannelName?: string
}

const OPTIONS_DEFAULTS = {
  broadcastChannelName: 'pinia-colada-plugin-broadcast-sync',
} satisfies Required<PiniaColadaPluginBroadcastSyncOptions>

interface BroadcastSyncPayload {
  state: DataState<unknown, unknown, unknown>
  key: EntryKey
}

export function PiniaColadaPluginBroadcastSync(options = OPTIONS_DEFAULTS): PiniaColadaPlugin {
  const broadcaster = new Broadcaster(options.broadcastChannelName)

  let transaction = false
  const makeTransaction = (cb: () => void) => {
    transaction = true
    cb()
    transaction = false
  }

  return ({ queryCache }) => {
    broadcaster.on<BroadcastSyncPayload>('updateState', (data) => {
      makeTransaction(() => {
        queryCache.setQueryData(data.key, data.state.data)
      })
    })

    queryCache.$onAction(({ name, args, after }) => {
      if (transaction) {
        return
      }

      after(() => {
        if (name === 'setEntryState') {
          const [entry, state] = args
          broadcaster.send<BroadcastSyncPayload>('updateState', { state, key: entry.key })
        }
      })
    })
  }
}
