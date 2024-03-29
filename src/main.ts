// Vue
import { createApp } from 'vue'
import App from '@/App.vue'

/**
 * Vue-Router
 */
import Router from '@/router/index'

/**
 * Tailwindcss
 */
import '@/assets/index.css'

/**
 * Google's Material Design
 */
import 'material-symbols/outlined.css'

/**
 * Pinia
 */
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState({
    auto: true,
}))

const app = createApp(App)
app.use(pinia).use(Router).mount('#app')

app.config.performance = true

