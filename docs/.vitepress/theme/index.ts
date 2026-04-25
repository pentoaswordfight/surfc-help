import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { initPostHog } from './posthog'

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    if (typeof window === 'undefined') return
    initPostHog(router)
  },
} satisfies Theme
