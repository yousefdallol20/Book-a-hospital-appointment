<template>
  <div class="user-dashboard-root" dir="rtl">
    <div id="app" class="dashboard-wrapper">
        
        <!-- هيدر الهواتف المحمولة الثابت (يظهر في شاشات الجوال فقط) -->
        <header class="mobile-header">
            <div class="d-flex align-items-center">
                <i class="fas fa-layer-group text-primary fs-4 me-2"></i>
                <span class="fw-bold text-dark ms-2">بوابة الشفاء</span>
            </div>
            <!-- زر الهامبرغر لفتح القائمة الجانبية بتأثير سلس -->
            <button type="button" class="mobile-toggle-btn" @click="isMobileMenuOpen = true">
                <i class="fas fa-bars"></i>
            </button>
        </header>

        <!-- طبقة التعتيم الخلفية (تظهر فقط عند فتح القائمة في الجوال لإغلاقها عند الضغط في أي مكان فارغ) -->
        <div v-if="isMobileMenuOpen" class="sidebar-overlay" @click="isMobileMenuOpen = false"></div>
        
        <!-- القائمة الجانبية الموحدة (Sidebar Dashboard) -->
        <!-- يتم التحكم بظهورها في الجوال عبر كلاس mobile-open ديناميكياً -->
        <aside class="sidebar" :class="{ 'mobile-open': isMobileMenuOpen }">
            <div class="sidebar-brand d-flex align-items-center">
                <i class="fas fa-layer-group text-primary fs-3 me-2"></i>
                <div class="ms-2">
                    <h5 class="fw-bold mb-0 text-white">بوابة الشفاء</h5>
                    <small class="text-muted text-xs">لوحة الخدمات الرقمية</small>
                </div>
            </div>
            
            <!-- خيارات القائمة وتحويل التبويبات مع إغلاق القائمة تلقائياً على الجوال بعد الاختيار -->
            <ul class="sidebar-menu">
                <li>
                    <a class="menu-item" :class="{ active: activeTab === 'book' }" @click.prevent="setActiveTab('book')">
                        <i class="fas fa-calendar-plus"></i>
                        <span>طلب حجز موعد</span>
                    </a>
                </li>
                <li>
                    <a class="menu-item" :class="{ active: activeTab === 'list' }" @click.prevent="setActiveTab('list')">
                        <i class="fas fa-calendar-check"></i>
                        <span>مواعيدي المجدولة</span>
                    </a>
                </li>
                <li>
                    <a class="menu-item" :class="{ active: activeTab === 'profile' }" @click.prevent="setActiveTab('profile')">
                        <i class="fas fa-id-card-alt"></i>
                        <span>الملف والمستندات</span>
                    </a>
                </li>
            </ul>

            <!-- زر تسجيل الخروج باللون الأحمر المخصص بأسفل الـ Sidebar -->
            <div class="p-3 border-top border-secondary border-opacity-10">
                <a href="#" @click.prevent="handleLogout" class="menu-item btn-logout-sidebar justify-content-center text-center py-2 mb-0">
                    <i class="fas fa-sign-out-alt ms-2"></i>
                    <span>تسجيل الخروج</span>
                </a>
            </div>
        </aside>

        <!-- منطقة العرض الرئيسية للمحتوى المتغير -->
        <main class="main-content">
            
            <!-- ترويسة الترحيب الداخلية (تختفي في شاشات الجوال لمنع تكرار الواجهة والازدحام) -->
            <header class="d-none d-lg-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 class="fw-bold mb-0">مرحباً بك في المنظومة الرقمية</h4>
                    <small class="text-muted">نظام ذكي متكامل يضمن تنسيق وحجز المواعيد بكل مرونة وشفافية.</small>
                </div>
            </header>

            <!-- ========================================== -->
            <!-- الواجهة الأولى: نموذج طلب حجز موعد جديد      -->
            <!-- ========================================== -->
            <div v-if="activeTab === 'book'" class="content-card">
                <div class="section-header mb-4">
                    <h3>طلب تحديد موعد زيارة جديد</h3>
                    <p class="text-muted small">يرجى تعبئة الحقول التنسيقية وتحديد القسم التخصصي لإرسال الطلب وحجز دورك بالنظام.</p>
                </div>

                <form @submit.prevent="submitBooking">
                    <div class="row g-4 mb-4">
                        <div class="col-md-6">
                            <label class="form-label">القسم الطبي التخصصي <span class="text-danger">*</span></label>
                            <select class="form-select" v-model="bookingForm.department" required>
                                <option value="" disabled selected>اختر القسم الطبي المطلوب</option>
                                <option value="طب الأطفال">عيادة طب الأطفال ورعايتهم</option>
                                <option value="الطب الباطني">الطب الباطني العام</option>
                                <option value="مركز القلب">مركز وعيادات أمراض القلب</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">تاريخ الزيارة المفضل <span class="text-danger">*</span></label>
                            <input type="date" class="form-control" v-model="bookingForm.appointment_date" required>
                        </div>
                    </div>

                    <!-- الخانة الديناميكية للدوام المعتمد من 8 صباحاً حتى 12 ظهراً -->
                    <div v-if="bookingForm.department && bookingForm.appointment_date" class="schedule-info-zone mb-4">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-clock text-primary fs-4 me-3"></i>
                            <div>
                                <h6 class="fw-bold text-dark mb-1">تفاصيل الدوام للطلب المختار:</h6>
                                <p class="mb-0 small text-muted">
                                    اليوم المختار: <span class="text-primary fw-bold">{{ getSelectedDayName(bookingForm.appointment_date) }}</span> 
                                    (تاريخ: {{ bookingForm.appointment_date }}) 
                                    | مواعيد الدوام الرسمي للقسم: <span class="text-success fw-bold">من الساعة 08:00 صباحاً وحتى الساعة 12:00 ظهراً</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-modern">
                        <i class="far fa-calendar-check me-1"></i> إرسال واعتماد طلب الحجز
                    </button>
                </form>
            </div>

            <!-- ========================================== -->
            <!-- الواجهة الثانية: جدول المواعيد وسجل الزيارات -->
            <!-- ========================================== -->
            <div v-else-if="activeTab === 'list'" class="content-card">
                <div class="section-header mb-4">
                    <h3>جدول ومتابعة المواعيد</h3>
                    <p class="text-muted small">سجل المواعيد والزيارات الخاصة بك مرتبة بشكل فوري وشفاف.</p>
                </div>

                <div class="table-responsive">
                    <table class="table custom-table">
                        <thead>
                            <tr>
                                <th>القسم الطبي</th>
                                <th>التاريخ المحجوز</th>
                                <th>مواعيد الدوام الثابتة</th>
                                <th>الحالة الحالية</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="appointment in appointmentsList" :key="appointment.id">
                                <td class="fw-bold text-dark">{{ appointment.department }}</td>
                                <td class="text-secondary">{{ appointment.date }}</td>
                                <td><span class="text-muted">08:00 ص - 12:00 ظ</span></td>
                                <td>
                                    <span :class="['badge-status', appointment.status === 'مؤكد' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary']">
                                        {{ appointment.status }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- ========================================== -->
            <!-- الواجهة الثالثة: استعراض الملف وتغيير كلمة المرور -->
            <!-- ========================================== -->
            <div v-else-if="activeTab === 'profile'" class="content-card">
                
                <div class="section-header mb-4">
                    <h3>ملف البيانات والمستندات الثبوتية</h3>
                    <p class="text-muted small">مراجعة وتعديل بيانات التواصل الفرعية المرتبطة بالملف الإلكتروني الموثق.</p>
                </div>

                <form @submit.prevent="updateProfile" class="mb-5">
                    <div class="row g-4 mb-4">
                        <div class="col-md-6">
                            <label class="form-label">الاسم الكامل الموثق بالنظام</label>
                            <input type="text" class="form-control" v-model="profileData.fullname" readonly>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">رقم الهوية الشخصية الأساسي</label>
                            <input type="text" class="form-control" v-model="profileData.national_id" readonly>
                        </div>
                    </div>

                    <div class="row g-4 mb-4">
                        <div class="col-md-6">
                            <label class="form-label">رقم الجوال الفعال للتواصل <span class="text-danger">*</span></label>
                            <input type="tel" class="form-control" v-model="profileData.phone" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">العنوان الوطني الحالي <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" v-model="profileData.address" required>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label">المستند الثبوتي المعتمد (الهوية المرفوعة)</label>
                        <div class="preview-zone d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-shield-alt text-primary fs-3 me-3"></i>
                                <div>
                                    <p class="mb-0 small fw-bold">identity_card_verified.png</p>
                                    <small class="text-success text-xs"><i class="fas fa-check-circle"></i> ملف معتمد وتدقيقه مكتمل</small>
                                </div>
                            </div>
                            <img src="https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?q=80&w=200" style="height: 80px; border-radius: 8px;" alt="معاينة المستند">
                        </div>
                    </div>

                    <button type="submit" class="btn btn-modern">
                        <i class="fas fa-save me-1"></i> حفظ تعديلات بيانات التواصل
                    </button>
                </form>

                <hr class="my-5" style="border-color: #e2e8f0;">

                <div class="section-header mb-4">
                    <h3>تعديل أمان الحساب (تغيير كلمة المرور)</h3>
                    <p class="text-muted small">تأمين الحساب دورياً عبر تحديث كلمة المرور الخاصة بكم.</p>
                </div>

                <form @submit.prevent="updatePassword">
                    <div class="mb-4">
                        <label class="form-label">كلمة المرور الحالية <span class="text-danger">*</span></label>
                        <input type="password" class="form-control" v-model="passwordForm.current_password" placeholder="••••••••" required>
                    </div>
                    <div class="row g-4 mb-4">
                        <div class="col-md-6">
                            <label class="form-label">كلمة المرور الجديدة <span class="text-danger">*</span></label>
                            <input type="password" class="form-control" v-model="passwordForm.new_password" placeholder="••••••••" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">تأكيد كلمة المرور الجديدة <span class="text-danger">*</span></label>
                            <input type="password" class="form-control" v-model="passwordForm.new_password_confirmation" placeholder="••••••••" required>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-modern btn-warning bg-warning border-0 text-dark">
                        <i class="fas fa-key me-1"></i> تحديث كلمة المرور الآمنة
                    </button>
                </form>
            </div>

        </main>
    </div>
  </div>
</template>

<script setup lang="ts">
   import { ref } from 'vue';

    // تعريف هياكل البيانات لـ TypeScript الصارم لمنع أخطاء الـ Compile
    interface Appointment {
    id: number;
    department: string;
    date: string;
    status: string;
    }

    // متغير للتحكم بعلامات التبويب النشطة[cite: 5]
    const activeTab = ref<string>('book');

    // متغير تفاعلي جديد للتحكم بحالة فتح وإغلاق قائمة الجوال[cite: 5]
    const isMobileMenuOpen = ref<boolean>(false);

    const bookingForm = ref({
        department: '',
        appointment_date: ''
    });

    const appointmentsList = ref<Appointment[]>([
        { id: 1, department: 'الطب الباطني العام', date: '2026-06-20', status: 'مؤكد' },
        { id: 2, department: 'عيادة طب الأطفال ورعايتهم', date: '2026-05-12', status: 'مكتملة سابقة' }
    ]);

    const profileData = ref({
        fullname: 'يوسف منذر دلول',
        national_id: '401234567',
        phone: '0599123456',
        address: 'غزة - الرمال الشمالي'
    });

    const passwordForm = ref({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });

    // تعيين علامة التبويب النشطة وإغلاق القائمة في الجوال تلقائياً
    const setActiveTab = (tabName: string): void => {
        activeTab.value = tabName;
        isMobileMenuOpen.value = false;
    };

    // تحويل التاريخ لاسم اليوم الفعلي باللغة العربية[cite: 5]
    const getSelectedDayName = (dateString: string): string => {
        if (!dateString) return '';
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString('ar-EG', { weekday: 'long' });
    };

    // معالجة الضغط على زر تسجيل الخروج[cite: 5]
    const handleLogout = (): void => {
        // الباك أند: مسح جلسة المستخدم والتوجه لصفحة الدخول
        alert('جاري تسجيل الخروج والتوجه لصفحة الدخول...');
    };

    const submitBooking = (): void => {
        alert(`تم إرسال طلب الحجز للقسم: ${bookingForm.value.department}`);
    };

    const updateProfile = (): void => {
        alert('تم حفظ تعديلات بيانات التواصل بنجاح.');
    };

    const updatePassword = (): void => {
        if (passwordForm.value.new_password !== passwordForm.value.new_password_confirmation) {
            alert('تنبيه: كلمة المرور الجديدة غير متطابقة مع حقل التأكيد.');
            return;
        }
        alert('تم تحديث كلمة المرور الأمنية للحساب.');
    };
</script>

<style scoped>
    /* استيراد ملف التنسيق العربي الخاص بالبوتستراب من الرابط الأصلي للحفاظ على استقرار الأبعاد */
    @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css";

    .user-dashboard-root {
        --primary-color: #4f46e5; 
        --primary-light: rgba(79, 70, 229, 0.08);
        --dark-sidebar: #0f172a; 
        --bg-body: #f8fafc;
        --text-main: #334155;
        --danger-color: #dc3545;
        
        background-color: var(--bg-body);
        color: var(--text-main);
        min-height: 100vh;
        width: 100%;
    }

    .dashboard-wrapper {
        display: flex;
        min-height: 100vh;
        position: relative;
    }

    /* ========================================== */
    /* تصميم القائمة الجانبية الأساسية (الشاشات الكبيرة) */
    /* ========================================== */
    .sidebar {
        width: 280px;
        background-color: var(--dark-sidebar);
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
        background-color: var(--primary-color);
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
    }

    /* زر تسجيل الخروج الأحمر بأسفل القائمة */
    .btn-logout-sidebar {
        background-color: rgba(220, 53, 69, 0.1);
        color: #f87171;
        border: 1px solid rgba(220, 53, 69, 0.2);
        transition: all 0.25s ease;
    }

    .btn-logout-sidebar:hover {
        background-color: var(--danger-color);
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
    }

    /* ========================================== */
    /* منطقة المحتوى الرئيسي                    */
    /* ========================================== */
    .main-content {
        flex-grow: 1;
        margin-right: 280px; 
        padding: 40px;
        transition: all 0.3s ease;
    }

    /* هيدر الجوال (يكون مخفي في الشاشات الكبيرة) */
    .mobile-header {
        display: none;
        background-color: #ffffff;
        padding: 15px 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1030;
        align-items: center;
        justify-content: space-between;
    }

    .mobile-toggle-btn {
        background: var(--primary-light);
        border: none;
        color: var(--primary-color);
        padding: 10px 14px;
        border-radius: 10px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    /* طبقة التعتيم الخلفية عند فتح قائمة الجوال */
    .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(4px);
        z-index: 1035;
        transition: opacity 0.3s ease;
    }

    /* بطاقات المحتوى الداخلي */
    .content-card {
        background: #ffffff;
        border-radius: 20px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 4px 18px rgba(15, 23, 42, 0.02);
        padding: 35px;
    }

    .section-header h3 {
        color: #0f172a;
        font-weight: 800;
    }

    .form-label {
        font-weight: 700;
        color: #344054;
        font-size: 0.9rem;
        margin-bottom: 6px;
    }

    .form-select, .form-control {
        border-radius: 12px;
        padding: 12px 16px;
        border: 1.5px solid #d0d5dd;
        font-size: 0.95rem;
        color: #1d2939;
    }

    .form-select:focus, .form-control:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
    }

    .form-control[readonly] {
        background-color: #f8fafc;
        color: #64748b;
        cursor: not-allowed;
    }

    .schedule-info-zone {
        background: linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
        border: 1.5px solid rgba(79, 70, 229, 0.15);
        border-radius: 16px;
        padding: 20px;
        margin-top: 20px;
    }

    .custom-table {
        border-collapse: separate;
        border-spacing: 0 8px;
    }

    .custom-table tbody tr {
        background-color: #ffffff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.01);
    }

    .custom-table td, .custom-table th {
        padding: 16px;
        vertical-align: middle;
    }

    .badge-status {
        padding: 6px 14px;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 700;
    }

    .btn-modern {
        background-color: var(--primary-color);
        color: #ffffff;
        font-weight: 700;
        padding: 12px 24px;
        border-radius: 12px;
        border: none;
        box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3);
        transition: all 0.2s;
    }

    .btn-modern:hover {
        background-color: #4338ca;
        color: #ffffff;
    }

    .preview-zone {
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        padding: 15px;
    }

    /* ========================================== */
    /* الميديا كويري (Media Queries) للهواتف      */
    /* ========================================== */
    @media (max-width: 991.98px) {
        /* إخفاء القائمة الجانبية خارج الشاشة جهة اليمين */
        .sidebar {
            transform: translateX(100%);
        }
        
        /* فئة تفعيل إظهار القائمة عبر سحبها للداخل */
        .sidebar.mobile-open {
            transform: translateX(0);
        }

        /* سحب منطقة المحتوى لتملأ الشاشة بالكامل */
        .main-content {
            margin-right: 0;
            padding: 20px;
            margin-top: 80px; /* ترك مساحة لهيدر الجوال العلوي */
        }

        /* إظهار هيدر الجوال المستقل */
        .mobile-header {
            display: flex;
        }

        .content-card {
            padding: 20px;
        }
    }
</style>

