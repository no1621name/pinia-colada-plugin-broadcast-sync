# pinia-colada-plugin-broadcast-sync

## Usage

Register the plugin when installing Pinia Colada

```typescript
import { PiniaColada } from '@pinia/colada'
import { createPinia } from 'pinia'
import { PiniaColadaBroadcastSyncPlugin } from 'pinia-colada-plugin-broadcast-sync'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(PiniaColada, {
  plugins: [PiniaColadaBroadcastSyncPlugin()],
})

app.mount('#app')
```
Then all your changes in the state will be broadcasted to other tabs automatically.

## Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `broadcastChannelName` | `string` | `'pinia-colada-plugin-broadcast-sync'` | The name of the broadcast channel to use. |

You can set the options when installing the plugin:

```typescript
PiniaColadaBroadcastSyncPlugin({
  broadcastChannelName: 'my-broadcast-channel'
})
```
