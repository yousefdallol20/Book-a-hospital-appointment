<template>
  <div class="admin-page-wrapper" dir="rtl">
    <div class="dashboard-wrapper">
      
      <header class="mobile-header">
        <div class="d-flex align-items-center">
          <i class="fas fa-shield-alt text-indigo fs-4 me-2"></i>
          <span class="fw-bold text-dark ms-2">الإدارة المركزية</span>
        </div>
        <button class="mobile-toggle-btn" @click="isMobileMenuOpen = true">
          <i class="fas fa-bars"></i>
        </button>
      </header>

      <div v-if="isMobileMenuOpen" class="sidebar-overlay" @click="isMobileMenuOpen = false"></div>

      <aside class="sidebar" :class="{ 'mobile-open': isMobileMenuOpen }">
        <div class="sidebar-brand d-flex align-items-center">
          <i class="fas fa-user-shield text-indigo fs-3 me-2"></i>
          <div class="ms-2">
            <h5 class="fw-bold mb-0 text-white">بوابة الإدارة</h5>
            <small class="text-muted text-xs">مستشفى الشفاء الطبي</small>
          </div>
        </div>
        
        <ul class="sidebar-menu">
          <li>
            <a class="menu-item" :class="{ active: activeTab === 'clinics_manage' }" @click="setActiveTab('clinics_manage')">
              <i class="fas fa-sliders-h"></i>
              <span>التحكم بالعيادات</span>
            </a>
          </li>
          <li>
            <a class="menu-item" :class="{ active: activeTab === 'verify_patients' }" @click="setActiveTab('verify_patients')">
              <i class="fas fa-user-check"></i>
              <span>توثيق الحسابات الجدد</span>
            </a>
          </li>
          <li>
            <a class="menu-item" :class="{ active: activeTab === 'profile' }" @click="setActiveTab('profile')">
              <i class="fas fa-user-cog"></i>
              <span>الملف الشخصي الإداري</span>
            </a>
          </li>
        </ul>

        <div class="p-3 border-top border-secondary border-opacity-10">
          <a href="#" @click.prevent="handleLogout" class="menu-item btn-logout-sidebar justify-content-center text-center py-2 mb-0">
            <i class="fas fa-sign-out-alt ms-2"></i>
            <span>خروج آمن</span>
          </a>
        </div>
      </aside>

      <main class="main-content">
          
        <div v-if="notification" class="alert alert-indigo alert-dismissible fade show border-0 shadow-sm rounded-3 mb-4" role="alert">
          <i class="fas fa-info-circle me-2"></i> <b>{{ notification }}</b>
          <button type="button" class="btn-close" @click="notification = ''"></button>
        </div>

        <div v-if="activeTab === 'clinics_manage'" class="content-card">
          <div class="mb-4">
            <h4 class="fw-bold text-dark"><i class="fas fa-hospital text-indigo me-2"></i>إدارة المحدودية وتوزيع أسقف الحجوزات البرمجية</h4>
            <p class="text-muted small">عدل السقف اليومي، أو غيّر حالة تشغيل القسم، وسيقوم نظام Laravel بتطبيق القفل التلقائي فوراً بناءً على مدخلاتك.</p>
          </div>

          <div class="table-responsive">
            <table class="table custom-table text-center align-middle mb-0">
              <thead>
                <tr class="table-light">
                  <th>كود القسم</th>
                  <th>اسم العيادة الخارجية</th>
                  <th>السقف اليومي الحالي</th>
                  <th>أيام التشغيل الأسبوعية</th>
                  <th>الأطباء المفرزون</th>
                  <th>الحالة التشغيلية</th>
                  <th>تعديل</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="clinic in clinics" :key="clinic.id">
                  <td class="fw-bold text-secondary">#{{ clinic.id }}</td>
                  <td class="fw-bold text-dark">{{ clinic.name }}</td>
                  <td><span class="badge bg-dark px-3 py-2 fs-6 rounded-3">{{ clinic.maxLimit }} حجز</span></td>
                  <td class="small text-muted fw-bold">{{ clinic.days.join(' ، ') }}</td>
                  <td class="small text-indigo fw-bold" style="white-space: normal;">{{ clinic.doctors.join(' ، ') }}</td>
                  <td>
                    <span :class="['badge px-2 py-1', clinic.isOpen ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger']">
                      {{ clinic.isOpen ? 'متاحة للحجز' : 'مغلقة إدارياً' }}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-indigo btn-sm rounded-3 px-3 fw-bold text-white" @click="openClinicSettings(clinic)">
                      <i class="fas fa-cog me-1"></i> ضبط
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else-if="activeTab === 'verify_patients'" class="content-card">
          <div class="mb-4">
            <h4 class="fw-bold text-dark"><i class="fas fa-id-card text-indigo me-2"></i>طلبات مراجعة الهويات وتدقيق الحسابات الإلكترونية</h4>
            <p class="text-muted small">طابق صورة الهوية المرفوعة مع البيانات المدخلة لمنع إنشاء الحسابات الوهمية أو احتكار الحجوزات.</p>
          </div>

          <div class="table-responsive">
            <table class="table custom-table text-center align-middle mb-0">
              <thead>
                <tr class="table-light">
                  <th>رقم الطلب</th>
                  <th>اسم المريض الرباعي</th>
                  <th>رقم الهوية الوطنية</th>
                  <th>تاريخ وتوقيت التسجيل</th>
                  <th>مستند التوثيق</th>
                  <th>الحالة</th>
                  <th>الإجراء الإداري</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="patient in firstTimePatients" :key="patient.id">
                  <td class="fw-bold">#{{ patient.id }}</td>
                  <td class="fw-bold text-dark text-start px-3">{{ patient.name }}</td>
                  <td><code>{{ patient.identity }}</code></td>
                  <td class="small text-muted">{{ patient.requestedAt }}</td>
                  <td>
                    <a :href="patient.idDocUrl" target="_blank" class="btn btn-outline-secondary btn-sm rounded-3">
                      <i class="fas fa-image me-1"></i> عرض الهوية
                    </a>
                  </td>
                  <td><span class="badge bg-warning-subtle text-warning px-2 py-1">قيد التدقيق</span></td>
                  <td>
                    <button class="btn btn-success btn-sm rounded-3 px-3 fw-bold me-1" @click="approveFirstTime(patient)">
                      <i class="fas fa-check me-1"></i> توثيق واعتماد
                    </button>
                  </td>
                </tr>
                <tr v-if="firstTimePatients.length === 0">
                  <td colspan="7" class="text-center py-4 text-muted">لا توجد طلبات توثيق حسابات جديدة معلقة حالياً.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else-if="activeTab === 'profile'" class="content-card">
          <div class="mb-4">
            <h4 class="fw-bold text-dark"><i class="fas fa-user-shield text-indigo me-2"></i>الملف الوظيفي لمدير المنظومة المركزية</h4>
            <p class="text-muted small">تحديث بيانات الاتصال الإدارية وتغيير كلمات السر المتقدمة للنظام.</p>
          </div>

          <form @submit.prevent="updateProfile">
            <div class="row g-4 mb-4">
              <div class="col-md-4">
                <label class="form-label">الاسم الكامل للإداري</label>
                <input type="text" class="form-control" v-model="adminData.name" required>
              </div>
              <div class="col-md-4">
                <label class="form-label">البريد الإلكتروني الرسمي</label>
                <input type="email" class="form-control" v-model="adminData.email" required>
              </div>
              <div class="col-md-4">
                <label class="form-label">رقم جوال الصلاحيات</label>
                <input type="text" class="form-control" v-model="adminData.phone" required>
              </div>
            </div>

            <hr class="my-4 text-muted opacity-25">

            <h5 class="fw-bold text-dark mb-3"><i class="fas fa-key text-indigo me-1 small"></i> تغيير كلمة المرور الإدارية</h5>
            <div class="row g-4 mb-4">
              <div class="col-md-4">
                <label class="form-label">كلمة السر الحالية</label>
                <input type="password" class="form-control" v-model="adminData.currentPassword" placeholder="••••••••">
              </div>
              <div class="col-md-4">
                <label class="form-label">كلمة السر الجديدة</label>
                <input type="password" class="form-control" v-model="adminData.newPassword" placeholder="••••••••">
              </div>
              <div class="col-md-4">
                <label class="form-label">تأكيد كلمة السر الجديدة</label>
                <input type="password" class="form-control" v-model="adminData.confirmPassword" placeholder="••••••••">
              </div>
            </div>

            <button type="submit" class="btn btn-indigo text-white px-4 py-2 rounded-3 fw-bold">
              <i class="fas fa-save me-1"></i> تحديث وإرجاع الصلاحيات
            </button>
          </form>
        </div>

        <div v-if="isModalOpen && selectedClinic" class="custom-modal-backdrop" @click.self="isModalOpen = false">
          <div class="custom-modal-content">
            <div class="p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
              <h5 class="fw-bold mb-0 text-dark"><i class="fas fa-sliders-h text-indigo me-1"></i> ضبط لوحة العيادة: {{ selectedClinic.name }}</h5>
              <button type="button" class="btn-close" @click="isModalOpen = false"></button>
            </div>
            <div class="p-4 text-start" dir="rtl">
              
              <div class="mb-3">
                <label class="form-label">السقف الرقمي الأعلى للحجوزات اليومية</label>
                <input type="number" class="form-control" v-model.number="selectedClinic.maxLimit" min="1" max="200">
                <small class="text-muted text-xs">الافتراضي هو 50 حجزاً، سيقوم السيستم بالقفل الآلي فور تعديله وبلوغه.</small>
              </div>

              <div class="mb-3">
                <label class="form-label">حالة عمل القسم الفورية</label>
                <select class="form-select" v-model="selectedClinic.isOpen">
                  <option :value="true">متاحة - استقبال الحجوزات مفعل</option>
                  <option :value="false">مغلقة - إيقاف استقبال المرضى مؤقتاً</option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">أيام التشغيل (اختر الأيام النشطة)</label>
                <div class="row g-2 pt-1">
                  <div v-for="day in availableDays" :key="day" class="col-4">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" :id="'day-' + day" :value="day" v-model="selectedClinic.days">
                      <label class="form-check-label small ms-1" :for="'day-' + day">{{ day }}</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-0">
                <label class="form-label">الأطباء المسؤولين المفرزين (مفصولين بفاصلة)</label>
                <input type="text" class="form-control" v-model="modalDoctors">
                <small class="text-muted text-xs">اكتب أسماء الأطباء لتظهر للمرضى في شباك الحجز.</small>
              </div>

            </div>
            <div class="p-3 bg-light border-top d-flex justify-content-end">
              <button type="button" class="btn btn-secondary me-2 rounded-3" @click="isModalOpen = false">إلغاء التعديل</button>
              <button type="button" class="btn btn-indigo text-white rounded-3 px-4 fw-bold" @click="saveClinicSettings">
                <i class="fas fa-save me-1"></i> حفظ الإعدادات وتعميمها
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('clinics_manage');
const isMobileMenuOpen = ref(false);
const isModalOpen = ref(false);
const notification = ref('');

const selectedClinic = ref(null);
const modalDoctors = ref('');

const availableDays = ref(['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس']);

const clinics = ref([
  { id: 101, name: 'عيادة الباطنة العامة', maxLimit: 50, days: ['السبت', 'الإثنين', 'الأربعاء'], doctors: ['د. أحمد الكردي'], isOpen: true },
  { id: 102, name: 'عيادة جراحة العظام', maxLimit: 50, days: ['السبت', 'الثلاثاء'], doctors: ['د. خالد فرج'], isOpen: true },
  { id: 103, name: 'عيادة الأطفال والرضع', maxLimit: 50, days: ['السبت', 'الأحد', 'الثلاثاء'], doctors: ['د. منير الدلول', 'د. رامي حلس'], isOpen: true },
  { id: 104, name: 'عيادة الأنف والأذن والحنجرة', maxLimit: 40, days: ['الأحد', 'الثلاثاء'], doctors: ['د. سمير النجار'], isOpen: true },
  { id: 105, name: 'عيادة طب وجراحة العيون', maxLimit: 50, days: ['الأحد', 'الأربعاء'], doctors: ['د. سليم غانم'], isOpen: false }
]);

const firstTimePatients = ref([
  { id: 901, name: 'رائد خليل السموني', identity: '908112233', requestedAt: '2026-06-15 10:12 ص', idDocUrl: '#' },
  { id: 902, name: 'منى فريد الشوا', identity: '401334455', requestedAt: '2026-06-15 11:30 ص', idDocUrl: '#' },
  { id: 903, name: 'عبد الرحمن رأفت نعيم', identity: '802556677', requestedAt: '2026-06-15 11:55 ص', idDocUrl: '#' }
]);

const adminData = ref({
  name: 'المهندس الإداري العام',
  email: 'admin@shifa.ps',
  phone: '0599000111',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const setActiveTab = (tabName) => {
  activeTab.value = tabName;
  isMobileMenuOpen.value = false;
};

const openClinicSettings = (clinic) => {
  selectedClinic.value = { ...clinic, days: [...clinic.days], doctors: [...clinic.doctors] };
  modalDoctors.value = selectedClinic.value.doctors.join(', ');
  isModalOpen.value = true;
};

const saveClinicSettings = () => {
  if (selectedClinic.value) {
    selectedClinic.value.doctors = modalDoctors.value.split(',').map(d => d.trim()).filter(d => d !== '');
    
    const idx = clinics.value.findIndex(c => c.id === selectedClinic.value.id);
    if (idx !== -1) {
      clinics.value[idx] = selectedClinic.value;
    }
    
    isModalOpen.value = false;
    triggerNotification(`تم تحديث إعدادات (${selectedClinic.value.name}) بنجاح.`);
  }
};

const approveFirstTime = (patient) => {
  firstTimePatients.value = firstTimePatients.value.filter(p => p.id !== patient.id);
  triggerNotification(`تم توثيق الحساب واعتماد هوية المريض (${patient.name}) وتجهيز ملفه.`);
};

const updateProfile = () => {
  if (adminData.value.newPassword || adminData.value.confirmPassword) {
    if (!adminData.value.currentPassword) {
      triggerNotification('يرجى إدخال كلمة السر الحالية أولاً لتتمكن من التغيير.');
      return;
    }
    if (adminData.value.newPassword !== adminData.value.confirmPassword) {
      triggerNotification('خطأ: كلمة السر الجديدة غير متطابقة مع حقل التأكيد.');
      return;
    }
  }
  adminData.value.currentPassword = '';
  adminData.value.newPassword = '';
  adminData.value.confirmPassword = '';
  
  triggerNotification('تم تحديث بيانات الحساب الشخصي وكلمة المرور الإدارية بنجاح.');
};

const triggerNotification = (msg) => {
  notification.value = msg;
  setTimeout(() => { notification.value = ''; }, 3500);
};

const handleLogout = () => {
  triggerNotification('جاري تسجيل الخروج الآمن والعودة لشاشة الدخول...');
};
</script>

<style scoped>
    @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css";

    .admin-page-wrapper {
    max-width: 100%;
    overflow-x: hidden;
    background-color: #f8fafc;
    color: #334155;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    width: 100%;
    }

    .dashboard-wrapper {
    display: flex;
    min-height: 100vh;
    position: relative;
    max-width: 100%;
    }

    .sidebar {
    width: 280px;
    background-color: #0f172a;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    right: 0;
    top: 0;
    z-index: 1040;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    transition: transform 0.3s ease-in-out;
    }

    .sidebar-brand {
    padding: 25px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .sidebar-menu {
    list-style: none;
    padding: 20px 12px;
    margin: 0;
    flex-grow: 1;
    }

    .menu-item {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    color: #94a3b8;
    text-decoration: none;
    border-radius: 12px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.25s ease;
    font-weight: 600;
    }

    .menu-item i {
    font-size: 1.2rem;
    margin-left: 12px;
    }

    .menu-item.active, .menu-item:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.06);
    }

    .menu-item.active {
    background-color: #4f46e5;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
    }

    .btn-logout-sidebar {
    background-color: rgba(220, 53, 69, 0.1);
    color: #f87171;
    border: 1px solid rgba(220, 53, 69, 0.2);
    }

    .btn-logout-sidebar:hover {
    background-color: #dc3545;
    color: #ffffff;
    }

    .main-content {
    flex-grow: 1;
    margin-right: 280px; 
    padding: 40px;
    transition: all 0.3s ease;
    max-width: 100%;
    }

    .mobile-header {
    display: none;
    background-color: #ffffff;
    padding: 15px 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    position: fixed;
    top: 0; right: 0; left: 0;
    z-index: 1030;
    align-items: center;
    justify-content: space-between;
    }

    .mobile-toggle-btn {
    background: rgba(79, 70, 229, 0.08);
    border: none;
    color: #4f46e5;
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 1.2rem;
    cursor: pointer;
    }

    .sidebar-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    z-index: 1035;
    }

    .content-card {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 18px rgba(15, 23, 42, 0.02);
    padding: 35px;
    margin-bottom: 20px;
    }

    .form-label { font-weight: 700; color: #344054; font-size: 0.9rem; margin-bottom: 6px;}
    .form-control, .form-select { border-radius: 12px; padding: 12px 16px; border: 1.5px solid #d0d5dd; }
    .form-control:focus, .form-select:focus { border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.08); outline: none; }

    .btn-indigo {
    background-color: #4f46e5;
    border: none;
    transition: background-color 0.2s;
    }
    .btn-indigo:hover {
    background-color: #4338ca;
    }
    .text-indigo {
    color: #4f46e5 !important;
    }

    .alert-indigo {
    background-color: rgba(79, 70, 229, 0.08);
    color: #4f46e5;
    border: 1px solid rgba(79, 70, 229, 0.15);
    }

    .custom-table {
    border-collapse: separate;
    border-spacing: 0 8px;
    min-width: 800px;
    }

    .table-responsive {
    border-radius: 12px;
    overflow-x: auto !important;
    }

    .custom-table tbody tr {
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.01);
    transition: background-color 0.2s;
    }
    .custom-table tbody tr:hover {
    background-color: #fafafa;
    }
    .custom-table td, .custom-table th {
    padding: 16px 12px;
    vertical-align: middle;
    white-space: nowrap;
    }

    .custom-modal-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(4px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    }

    .custom-modal-content {
    background: #ffffff;
    border-radius: 20px;
    width: 100%;
    max-width: 580px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    animation: slideUp 0.3s ease;
    overflow: hidden;
    max-height: 90vh;
    overflow-y: auto;
    }

    @keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
    }

    @media (max-width: 991.98px) {
    .sidebar { transform: translateX(100%); }
    .sidebar.mobile-open { transform: translateX(0); }
    .main-content { margin-right: 0; padding: 15px; margin-top: 75px; }
    .mobile-header { display: flex; }
    .content-card { padding: 20px; }
    }
</style>