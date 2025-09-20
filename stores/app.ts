// Pinia root store (comments in English)
import { defineStore } from 'pinia'

type Theme = 'light' | 'dark'

interface AppState {
  ready: boolean
  theme: Theme
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    ready: false,
    theme: 'dark',
  }),
  getters: {
    isReady: state => state.ready,
  },
  actions: {
    setReady(v: boolean) {
      this.ready = v
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
    },
  },
})
