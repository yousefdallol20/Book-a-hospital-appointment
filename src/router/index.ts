// src/router/index.js
// 1. نستورد الدوال البرمجية اللازمة من مكتبة Vue Router
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue"; // الصفحة الرئيسية
import LoginView from "../views/Login.vue"; // صفحة تسجيل الدخول
import ReceptionView from "../views/ReceptionDashboard.vue"; // <--- استيراد الصفحة الجديدة
import AdminDashboardView from '../views/AdminDashboard.vue' // <--- استيراد صفحة الإدارة الجديدة
import UserDashboardView from '../views/UserDashboard.vue' // <--- تأكد من استيراد المكون هنا

// 3. نُعرّف قائمة المسارات (Routes) وكل مسار يتكون من:
// - path: الرابط الذي يظهر في شريط المتصفح فوق (مثل /login)
// - name: اسم رمزي للمسار نستخدمه برمجياً لسهولة التنقل
// - component: الصفحة التي سيتم عرضها عندما يزور المستخدم هذا الرابط
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/ReceptionDashboard",
    name: "ReceptionDashboard",
    component: ReceptionView,
  },
  {
    path: "/AdminDashboard",
    name: "AdminDashboard",
    component: AdminDashboardView,
  },
  {
    path: "/UserDashboard",
    name: "UserDashboard",
    component: UserDashboardView,
  },
];

// 4. ننشئ كائن الـ Router ونضبط الإعدادات
const router = createRouter({
  // في بيئة Vite الحديثة نستخدم import.meta.env.BASE_URL بدلاً من process.env
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // نمرر قائمة المسارات التي عرفناها فوق
});

// 5. نُصدّر الـ router ليصبح قابلاً للاستخدام في ملفات المشروع الأخرى
export default router;
