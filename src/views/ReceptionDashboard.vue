<template>
  <div class="dashboard-wrapper" dir="rtl">
    <!-- هيدر الجوال المحدث والآمن للمساحات الصغيرة -->
    <header class="mobile-header">
      <div class="d-flex align-items-center">
        <i class="fas fa-desktop text-info fs-4 me-2"></i>
        <span class="fw-bold text-dark ms-2">شباك التسجيل</span>
      </div>
      <button class="mobile-toggle-btn" @click="isMobileMenuOpen = true">
        <i class="fas fa-bars"></i>
      </button>
    </header>

    <div v-if="isMobileMenuOpen" class="sidebar-overlay" @click="isMobileMenuOpen = false"></div>

    <!-- القائمة الجانبية -->
    <aside class="sidebar" :class="{ 'mobile-open': isMobileMenuOpen }">
      <div class="sidebar-brand d-flex align-items-center">
        <i class="fas fa-desktop text-info fs-3 me-2"></i>
        <div class="ms-2">
          <h5 class="fw-bold mb-0 text-white">شباك التسجيل</h5>
          <small class="text-muted text-xs">منظومة العيادات الخارجية</small>
        </div>
      </div>
      
      <ul class="sidebar-menu">
        <li>
          <a class="menu-item" :class="{ active: activeTab === 'quick_book' }" @click="activeTab = 'quick_book'; isMobileMenuOpen = false">
            <i class="fas fa-calendar-check"></i>
            <span>حجز موعد سريع</span>
          </a>
        </li>
        <li>
          <a class="menu-item" :class="{ active: activeTab === 'today_bookings' }" @click="activeTab = 'today_bookings'; isMobileMenuOpen = false">
            <i class="fas fa-list-alt"></i>
            <span>حجوزات اليوم</span>
          </a>
        </li>
        <li>
          <a class="menu-item" :class="{ active: activeTab === 'new_patient' }" @click="activeTab = 'new_patient'; isMobileMenuOpen = false">
            <i class="fas fa-user-plus"></i>
            <span>تسجيل أول مرة</span>
          </a>
        </li>
        <li>
          <a class="menu-item" :class="{ active: activeTab === 'profile' }" @click="activeTab = 'profile'; isMobileMenuOpen = false">
            <i class="fas fa-user-cog"></i>
            <span>الملف الشخصي</span>
          </a>
        </li>
      </ul>

      <div class="p-3 border-top border-secondary border-opacity-10">
        <a href="#" @click.prevent="handleLogout" class="menu-item btn-logout-sidebar justify-content-center text-center py-2 mb-0">
          <i class="fas fa-sign-out-alt ms-2"></i>
          <span>خروج من النظام</span>
        </a>
      </div>
    </aside>

    <!-- منطقة المحتوى الرئيسي -->
    <main class="main-content">
      
      <div v-if="notification" class="alert alert-info alert-dismissible fade show border-0 shadow-sm rounded-3 mb-4" role="alert">
        <i class="fas fa-info-circle me-2"></i> <b>{{ notification }}</b>
        <button type="button" class="btn-close" @click="notification = ''"></button>
      </div>

      <!-- تبويب: حجز موعد سريع -->
      <div v-if="activeTab === 'quick_book'" class="content-card">
        <div class="mb-4">
          <h4 class="fw-bold text-dark"><i class="fas fa-search text-info me-2"></i>إدارة المراجعين والتحقق من الحضور اليومي</h4>
          <p class="text-muted small">ابحث عن المراجع بكتابة (الاسم أو رقم الهوية) في نفس خانة البحث، أو حدد تاريخاً من التقويم المالي على اليسار.</p>
        </div>

        <div class="row g-3 mb-4">
          <div class="col-md-8">
            <label class="form-label">ابحث عن المراجع (بالاسم الكامل أو رقم الهوية الوطنية)</label>
            <div class="input-group">
              <span class="input-group-text bg-light text-secondary"><i class="fas fa-search"></i></span>
              <input type="text" class="form-control" v-model="searchQuery" placeholder="اكتب الاسم أو رقم الهوية المكون من 9 أرقام هنا...">
            </div>
          </div>
          <div class="col-md-4">
            <label class="form-label">تصفية حسب تاريخ الحجز</label>
            <div class="input-group">
              <span class="input-group-text bg-light text-secondary"><i class="fas fa-calendar-alt"></i></span>
              <input type="date" class="form-control" v-model="filterDate">
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table custom-table text-center align-middle">
            <thead>
              <tr class="table-light">
                <th>رقم الملف</th>
                <th>اسم المراجع الكامل</th>
                <th>رقم الهوية</th>
                <th>تاريخ الموعد المجدول</th>
                <th>العيادة المطلوبة</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="patient in filteredPatients" :key="patient.id" class="clickable-row" @click="viewPatientDetails(patient)">
                <td class="fw-bold">#{{ patient.id }}</td>
                <td class="fw-bold text-primary text-decoration-underline">{{ patient.name }}</td>
                <td><code>{{ patient.identity }}</code></td>
                <td><i class="far fa-clock me-1 text-muted"></i> {{ patient.date }}</td>
                <td><span class="badge bg-light text-dark border">{{ patient.department }}</span></td>
                <td>
                  <span :class="['fw-bold', patient.status === 'حاضر' ? 'text-success' : 'text-secondary']">
                    {{ patient.status }}
                  </span>
                </td>
              </tr>
              <tr v-if="filteredPatients.length === 0">
                <td colspan="6" class="text-center py-4 text-muted">لا توجد سجلات مراجعين تطابق خيارات البحث الحالية.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- تبويب: حجوزات اليوم -->
      <div v-else-if="activeTab === 'today_bookings'" class="content-card">
        <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
          <div>
            <h4 class="fw-bold text-dark"><i class="fas fa-list-alt text-info me-2"></i>كشف الحجوزات المؤكدة لليوم (الحاضرين)</h4>
            <p class="text-muted small mb-0">يعرض هذا الكشف جميع الأشخاص الحاضرين مع كامل بياناتهم التي تم ترحيلها من شباك التسجيل.</p>
          </div>
          <button class="btn btn-outline-dark btn-sm rounded-3 align-self-start align-self-sm-center" @click="printAll">
            <i class="fas fa-print me-1"></i> طباعة الكشف الإجمالي
          </button>
        </div>

        <div class="table-responsive">
          <table class="table custom-table text-center align-middle">
            <thead>
              <tr class="table-light">
                <th>رقم التذكرة</th>
                <th>اسم المراجع الحاضر</th>
                <th>رقم الهوية</th>
                <th>تاريخ الميلاد</th>
                <th>العيادة المستهدفة</th>
                <th>الأطباء المسؤولين</th>
                <th>تاريخ الحضور</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="b in todayBookings" :key="b.ticketId">
                <td class="fw-bold text-danger">#{{ b.ticketId }}</td>
                <td class="fw-bold text-dark">{{ b.patientName }}</td>
                <td><code>{{ b.identity }}</code></td>
                <td><i class="fas fa-birthday-cake text-muted me-1 small"></i> {{ b.birthDate }}</td>
                <td><span class="badge bg-info-subtle text-info">{{ b.clinicName }}</span></td>
                <td class="small text-muted fw-bold">{{ b.doctors }}</td>
                <td class="small text-secondary">{{ b.date }}</td>
                <td>
                  <button class="btn btn-info text-white btn-sm rounded-3 px-3 fw-bold" @click="triggerReprint(b)">
                    <i class="fas fa-print me-1"></i> تذكرة
                  </button>
                </td>
              </tr>
              <tr v-if="todayBookings.length === 0">
                <td colspan="8" class="text-center py-4 text-muted">لم يتم تسجيل حضور أي مراجعين اليوم بعد.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- تبويب: تسجيل أول مرة -->
      <div v-else-if="activeTab === 'new_patient'" class="content-card">
        <div class="mb-4">
          <h4 class="fw-bold text-dark"><i class="fas fa-user-plus text-info me-2"></i>فتح ملف جديد ومستند لأول مرة</h4>
          <p class="text-muted small">استخدم هذه الواجهة لإدخال بيانات المراجع الجديد كلياً الذي يزور المستشفى لأول مرة.</p>
        </div>

        <form @submit.prevent="registerNewPatient">
          <div class="row g-4 mb-4">
            <div class="col-md-6">
              <label class="form-label">الاسم رباعي للمراجع</label>
              <input type="text" class="form-control" v-model="newPatient.name" placeholder="مثال: أحمد محمد محمود علي" required>
            </div>
            <div class="col-md-6">
              <label class="form-label">رقم الهوية الوطنية (9 أرقام)</label>
              <input type="text" class="form-control" v-model="newPatient.identity" placeholder="000000000" maxlength="9" required>
            </div>
            <div class="col-md-3">
              <label class="form-label">تاريخ الميلاد</label>
              <input type="date" class="form-control" v-model="newPatient.birthDate" required>
            </div>
            <div class="col-md-3">
              <label class="form-label">رقم الجوال للتواصل</label>
              <input type="text" class="form-control" v-model="newPatient.phone" placeholder="059xxxxxxx" required>
            </div>
            <div class="col-md-3">
              <label class="form-label">العيادة المراد الحجز بها</label>
              <select class="form-select" v-model="newPatient.department" required>
                <option value="" disabled selected>اختر العيادة...</option>
                <option v-for="clinic in clinics" :key="clinic.id" :value="clinic.name">{{ clinic.name }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">تاريخ الموعد</label>
              <input type="date" class="form-control" v-model="newPatient.date" required>
            </div>
          </div>
          <button type="submit" class="btn btn-info text-white px-4 py-2 rounded-3 fw-bold">
            <i class="fas fa-save me-1"></i> إرسال وثيقة الملف وحفظها
          </button>
        </form>
      </div>

      <!-- تبويب: الملف الشخصي -->
      <div v-else-if="activeTab === 'profile'" class="content-card">
        <div class="mb-4">
          <h4 class="fw-bold text-dark"><i class="fas fa-user-cog text-info me-2"></i>الملف الشخصي لموظف التسجيل</h4>
          <p class="text-muted small">تحديث البيانات الوظيفية الأساسية وإدارة حماية وكلمات سر الحساب.</p>
        </div>

        <form @submit.prevent="updateProfile">
          <div class="row g-4 mb-4">
            <div class="col-md-4">
              <label class="form-label">الاسم الكامل للموظف</label>
              <input type="text" class="form-control" v-model="adminData.name" required>
            </div>
            <div class="col-md-4">
              <label class="form-label">البريد الإلكتروني</label>
              <input type="email" class="form-control" v-model="adminData.email" required>
            </div>
            <div class="col-md-4">
              <label class="form-label">رقم الجوال الخاص بالعمل</label>
              <input type="text" class="form-control" v-model="adminData.phone" required>
            </div>
          </div>

          <hr class="my-4 text-muted opacity-25">

          <h5 class="fw-bold text-dark mb-3"><i class="fas fa-key text-info me-1 small"></i> إدارة وتغيير كلمة المرور</h5>
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

          <button type="submit" class="btn btn-info text-white px-4 py-2 rounded-3 fw-bold">
            <i class="fas fa-save me-1"></i> حفظ وتحديث ملف الحساب
          </button>
        </form>
      </div>

      <!-- مودال تفاصيل المراجع -->
      <div v-if="isDetailsModalOpen && selectedPatient" class="custom-modal-backdrop" @click.self="isDetailsModalOpen = false">
        <div class="custom-modal-content">
          <div class="p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
            <h5 class="fw-bold mb-0 text-dark"><i class="fas fa-id-card text-info me-1"></i> تفاصيل بيانات المراجع</h5>
            <button type="button" class="btn-close" @click="isDetailsModalOpen = false"></button>
          </div>
          <div class="p-4 text-start" dir="rtl">
            <div class="table-responsive">
              <table class="table table-bordered small" style="min-width:100%">
                <tbody>
                  <tr>
                    <th class="bg-light text-secondary" style="width: 35%;">رقم الملف الشخصي</th>
                    <td class="fw-bold">#{{ selectedPatient.id }}</td>
                  </tr>
                  <tr>
                    <th class="bg-light text-secondary">الاسم الكامل رباعي</th>
                    <td class="fw-bold text-dark" style="white-space:normal;">{{ selectedPatient.name }}</td>
                  </tr>
                  <tr>
                    <th class="bg-light text-secondary">رقم الهوية الوطنية</th>
                    <td><code>{{ selectedPatient.identity }}</code></td>
                  </tr>
                  <tr>
                    <th class="bg-light text-secondary">تاريخ الميلاد</th>
                    <td>{{ selectedPatient.birthDate }}</td>
                  </tr>
                  <tr>
                    <th class="bg-light text-secondary">العمر الحالي المعتمد</th>
                    <td class="fw-bold text-danger">{{ selectedPatient.age }} سنة</td>
                  </tr>
                  <tr>
                    <th class="bg-light text-secondary">رقم جوال التواصل</th>
                    <td>{{ selectedPatient.phone }}</td>
                  </tr>
                  <tr>
                    <th class="bg-light text-secondary">العيادة المطلوبة</th>
                    <td><span class="badge bg-info-subtle text-info">{{ selectedPatient.department }}</span></td>
                  </tr>
                  <tr>
                    <th class="bg-light text-secondary">تاريخ حجز الموعد</th>
                    <td>{{ selectedPatient.date }}</td>
                  </tr>
                  <tr>
                    <th class="bg-light text-secondary">الحالة الراهنة</th>
                    <td>
                      <span :class="['badge', selectedPatient.status === 'حاضر' ? 'bg-success' : 'bg-secondary']">
                        {{ selectedPatient.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="p-3 bg-light border-top d-flex justify-content-end">
            <button type="button" class="btn btn-secondary me-2 rounded-3" @click="isDetailsModalOpen = false">إغلاق</button>
            <button v-if="selectedPatient.status === '-'" type="button" class="btn btn-success rounded-3 px-4 fw-bold" @click="checkInPatient(selectedPatient)">
              <i class="fas fa-user-check me-1"></i> تسجيل حضور وترحيل
            </button>
          </div>
        </div>
      </div>

      <!-- تذكرة الطباعة المنبثقة -->
      <div v-if="isPrintBoxOpen && activeTicket" class="custom-modal-backdrop" @click.self="isPrintBoxOpen = false">
        <div class="custom-modal-content print-area p-4" style="max-width: 420px;">
          <div class="text-center ticket-box">
            <h5 class="fw-bold mb-1 text-dark">بوابة الشفاء الرقمية</h5>
            <p class="text-muted small border-bottom pb-2">تذكرة مراجعة العيادات الخارجية</p>
            <div class="text-start my-2 small" dir="rtl">
              <p class="mb-1"><b>رقم التذكرة:</b> #{{ activeTicket.ticketId }}</p>
              <p class="mb-1"><b>الاسم:</b> {{ activeTicket.patientName }}</p>
              <p class="mb-1"><b>رقم الهوية:</b> {{ activeTicket.identity }}</p>
              <p class="mb-1"><b>تاريخ الميلاد:</b> {{ activeTicket.birthDate }}</p>
              <p class="mb-1"><b>العيادة:</b> {{ activeTicket.clinicName }}</p>
              <p class="mb-0"><b>الاطباء:</b> {{ activeTicket.doctors }}</p>
            </div>
            <button type="button" class="btn btn-dark btn-sm w-100 mt-3 d-print-none" @click="executePrint">اطبع الآن</button>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('quick_book'); 
const notification = ref('');
const isMobileMenuOpen = ref(false); 
const isDetailsModalOpen = ref(false);
const isPrintBoxOpen = ref(false);
const selectedPatient = ref(null);
const activeTicket = ref(null);

const searchQuery = ref('');
const filterDate = ref('');

const newPatient = ref({ name: '', identity: '', birthDate: '', phone: '', department: '', date: '' });

const clinics = ref([
  { id: 101, name: 'الطب الباطني العام', doctors: ['د. أحمد الكردي'] },
  { id: 102, name: 'عيادة طب الأطفال ورعايتهم', doctors: ['د. منير الدلول', 'د. رامي حلس'] },
  { id: 103, name: 'مركز وعيادات أمراض القلب', doctors: ['د. سليم غانم'] },
  { id: 104, name: 'قسم الجراحة العامة', doctors: ['د. بلال المصري', 'د. سمير النجار'] },
  { id: 105, name: 'عيادة العظام والمفاصل', doctors: ['د. خالد فرج'] }
]);

const patientsDB = ref([
  { id: 501, name: 'قصي يوسف السعدي', identity: '123456789', birthDate: '1998-05-12', age: 28, phone: '0599111222', department: 'الطب الباطني العام', date: '2026-06-14', status: '-' },
  { id: 502, name: 'محمد عبد الله سلامة', identity: '409876543', birthDate: '2018-11-20', age: 7, phone: '0599222333', department: 'عيادة طب الأطفال ورعايتهم', date: '2026-06-14', status: '-' },
  { id: 503, name: 'بلال محمد الشيخ', identity: '987654321', birthDate: '1990-01-05', age: 36, phone: '0599444555', department: 'مركز وعيادات أمراض القلب', date: '2026-06-15', status: '-' },
  { id: 504, name: 'سارة محمود الخالدي', identity: '801234567', birthDate: '2002-07-20', age: 24, phone: '0599777888', department: 'قسم الجراحة العامة', date: '2026-06-14', status: '-' }
]);

const todayBookings = ref([]);

const adminData = ref({ 
  name: 'موظف شباك التسجيل 1', email: 'shubak1@shifa.ps', phone: '0599888777',
  currentPassword: '', newPassword: '', confirmPassword: ''
});

const filteredPatients = computed(() => {
  return patientsDB.value.filter(p => {
    const query = searchQuery.value.trim().toLowerCase();
    const matchQuery = p.name.toLowerCase().includes(query) || p.identity.includes(query);
    const matchDate = filterDate.value ? p.date === filterDate.value : true;
    return matchQuery && matchDate;
  });
});

const registerNewPatient = () => {
  const birthYear = new Date(newPatient.value.birthDate).getFullYear();
  const currentYear = 2026;
  const computedAge = currentYear - birthYear;

  const newlyAdded = {
    id: Math.floor(600 + Math.random() * 300),
    name: newPatient.value.name,
    identity: newPatient.value.identity,
    birthDate: newPatient.value.birthDate,
    age: computedAge,
    phone: newPatient.value.phone,
    department: newPatient.value.department,
    date: newPatient.value.date,
    status: '-'
  };

  patientsDB.value.push(newlyAdded);
  triggerNotification(`تم فتح ملف المراجع الجديد (${newPatient.value.name}) بنجاح.`);
  newPatient.value = { name: '', identity: '', birthDate: '', phone: '', department: '', date: '' };
  activeTab.value = 'quick_book';
};

const viewPatientDetails = (patient) => {
  selectedPatient.value = patient;
  isDetailsModalOpen.value = true;
};

const checkInPatient = (patient) => {
  patient.status = 'حاضر';
  const clinicInfo = clinics.value.find(c => c.name === patient.department);
  const docsList = clinicInfo ? clinicInfo.doctors.join('، ') : 'الدكتور المناوب';

  const ticketData = {
    ticketId: Math.floor(7000 + Math.random() * 2000),
    patientName: patient.name,
    identity: patient.identity,
    birthDate: patient.birthDate, 
    phone: patient.phone,
    clinicName: patient.department,
    doctors: docsList,
    date: patient.date
  };

  todayBookings.value.push(ticketData);
  isDetailsModalOpen.value = false;
  triggerNotification(`تم إثبات حضور المراجع وترحيله بنجاح.`);
};

const triggerReprint = (booking) => {
  activeTicket.value = booking;
  isPrintBoxOpen.value = true;
};

const executePrint = () => {
  window.print();
  isPrintBoxOpen.value = false;
};

const printAll = () => {
  window.print();
};

const updateProfile = () => { 
  triggerNotification('تم تحديث بيانات ملف الموظف بنجاح.'); 
};

const triggerNotification = (msg) => {
  notification.value = msg;
  setTimeout(() => { notification.value = ''; }, 4000);
};

const handleLogout = () => { 
  triggerNotification('يتم تسجيل الخروج الآمن...'); 
};
</script>

<style scoped>
:root {
  --primary-color: #0f172a; 
  --accent-color: #0284c7;  
  --accent-light: rgba(2, 132, 199, 0.08);
  --dark-sidebar: #0f172a; 
  --bg-body: #f8fafc;
  --text-main: #334155;
  --danger-color: #dc3545;
  --success-color: #16a34a;
}

.dashboard-wrapper {
  display: flex;
  min-height: 100vh;
  position: relative;
  max-width: 100%;
  overflow-x: hidden;
  background-color: #f8fafc;
  font-family: 'Cairo', sans-serif;
}

/* القائمة الجانبية */
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
  background-color: #0284c7;
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
}

.btn-logout-sidebar {
  background-color: rgba(220, 53, 69, 0.1);
  color: #f87171;
  border: 1px solid rgba(220, 53, 69, 0.2);
  transition: all 0.25s ease;
}

.btn-logout-sidebar:hover {
  background-color: #dc3545;
  color: #ffffff;
}

/* منطقة المحتوى الرئيسي */
.main-content {
  flex-grow: 1;
  margin-right: 280px; 
  padding: 40px;
  transition: all 0.3s ease;
  max-width: 100%;
}

/* هيدر الجوال */
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
  background: rgba(2, 132, 199, 0.08);
  border: none;
  color: #0284c7;
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
  word-wrap: break-word;
}

.form-label { font-weight: 700; color: #344054; font-size: 0.9rem; margin-bottom: 6px;}
.form-control, .form-select { border-radius: 12px; padding: 12px 16px; border: 1.5px solid #d0d5dd; }
.form-control:focus, .form-select:focus { border-color: #0284c7; box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.08); }

.ticket-box {
  border: 2px dashed #cbd5e1;
  border-radius: 16px;
  padding: 20px;
  background-color: #fafafa;
}

.custom-table {
  border-collapse: separate;
  border-spacing: 0 8px;
  min-width: 600px;
}

.table-responsive {
  border-radius: 12px;
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch;
}

.custom-table tbody tr {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.01);
}
.custom-table tbody tr.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s;
}
.custom-table tbody tr.clickable-row:hover {
  background-color: #f0fdf4;
}
.custom-table td, .custom-table th {
  padding: 14px;
  vertical-align: middle;
  white-space: nowrap;
}

/* الواجهة المنبثقة التفاعلية */
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
  max-width: 550px;
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

/* تعديلات التجاوب الكامل للشاشات الصغيرة */
@media (max-width: 991.98px) {
  .sidebar { transform: translateX(100%); }
  .sidebar.mobile-open { transform: translateX(0); }
  .main-content { margin-right: 0; padding: 15px; margin-top: 75px; }
  .mobile-header { display: flex; }
  .content-card { padding: 20px; }
}

@media print {
  body * { visibility: hidden; }
  .print-area, .print-area * { visibility: visible; }
  .print-area { position: absolute; left: 0; top: 0; width: 100%; }
}
</style>