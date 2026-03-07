import { ViteSSG } from 'vite-ssg'
import App from './App.vue'

const routes = [
  { path: '/', component: App },
]

export const createApp = ViteSSG(
  App,
  { routes },
  () => {
    // App initialization complete
  }
)