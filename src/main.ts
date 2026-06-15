import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index' // <--- هنا نقوم باستيراد ملف الإعدادات الذي أنشأناه للتو

const app = createApp(App)

app.use(router) // <--- هنا نطلب من التطبيق استخدام نظام الروابط

app.mount('#app')
