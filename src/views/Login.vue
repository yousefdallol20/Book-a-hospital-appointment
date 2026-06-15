<template>
  <div class="auth-page-wrapper" dir="rtl">
    <div id="app" class="auth-container container">
      <div class="row g-0">
        <div class="col-lg-4 auth-sidebar text-center text-lg-start">
          <div class="position-relative z-1">
            <div
              class="d-flex align-items-center justify-content-center justify-content-lg-start mb-4"
            >
              <i class="fas fa-hospital-user fs-1 text-info me-3"></i>
              <div class="ms-2">
                <h4 class="fw-bold mb-0 text-white">مستشفى الشفاء</h4>
                <small class="text-info-subtle"
                  >العيادات الخارجية الإلكترونية</small
                >
              </div>
            </div>
            <h5 class="fw-bold text-white mb-3" v-if="isLoginMode">
              مرحباً بك مجدداً في البوابة الرقمية
            </h5>
            <h5 class="fw-bold text-white mb-3" v-else>
              انضم إلى المنظومة الرقمية الآن
            </h5>
            <p class="small text-white-50 lh-lg mb-0">
              نظام ذكي متكامل يضمن حجز المواعيد الطبية بكل عدالة وشفافية صارمة،
              ويقلل من وقت الانتظار داخل المستشفى.
            </p>
          </div>
        </div>

        <div class="col-lg-8 auth-form-wrapper">
          <div v-if="isLoginMode">
            <div class="mb-4">
              <h3 class="fw-bold text-dark-blue mb-2">تسجيل الدخول للبوابة</h3>
              <p class="text-muted small">
                أدخل رقم الهوية وكلمة المرور للوصول إلى لوحة التحكم والمواعيد
                المحجوزة.
              </p>
            </div>

            <form @submit.prevent="handleLogin">
              <div class="mb-4">
                <label class="form-label"
                  >رقم الهوية الشخصية <span class="text-danger">*</span></label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fas fa-id-card"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="loginForm.national_id"
                    placeholder="أدخل رقم الهوية المكون من 9 أرقام"
                    required
                  />
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label"
                  >كلمة المرور <span class="text-danger">*</span></label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fas fa-lock"></i
                  ></span>
                  <input
                    type="password"
                    class="form-control"
                    v-model="loginForm.password"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="rememberMe"
                  />
                  <label
                    class="form-check-label text-muted small ms-1"
                    for="rememberMe"
                    >تذكرني على هذا الجهاز</label
                  >
                </div>
                <a
                  href="#"
                  class="text-primary small text-decoration-none fw-bold"
                  >نسيت كلمة المرور؟</a
                >
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100 btn-submit mb-4"
              >
                <i class="fas fa-sign-in-alt me-2"></i> تسجيل الدخول
              </button>

              <p class="text-center text-muted small mb-0">
                ليس لديك حساب حتى الآن؟
                <span class="toggle-auth-link" @click="isLoginMode = false"
                  >أنشئ حساباً الآن</span
                >
              </p>
            </form>
          </div>

          <div v-else>
            <div class="mb-4">
              <h3 class="fw-bold text-dark-blue mb-2">إنشاء حساب جديد</h3>
              <p class="text-muted small">
                الرجاء إدخال البيانات الشخصية الموثقة لفتح الملف الإلكتروني ومنع
                الحسابات الوهمية.
              </p>
            </div>

            <form
              @submit.prevent="handleRegister"
              enctype="multipart/form-data"
            >
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label"
                    >الاسم الرباعي المعتمد
                    <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="registerForm.fullname"
                    placeholder="الاسم كما هو في الهوية"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label"
                    >رقم الهوية الشخصية
                    <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="registerForm.national_id"
                    placeholder="المعرّف الفريد الأساسي"
                    required
                  />
                </div>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label"
                    >تاريخ الميلاد <span class="text-danger">*</span></label
                  >
                  <input
                    type="date"
                    class="form-control"
                    v-model="registerForm.birth_date"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label"
                    >رقم جوال فعال للتواصل
                    <span class="text-danger">*</span></label
                  >
                  <input
                    type="tel"
                    class="form-control"
                    v-model="registerForm.phone"
                    placeholder="059XXXXXXXX"
                    required
                  />
                </div>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label"
                    >الجنس <span class="text-danger">*</span></label
                  >
                  <select
                    class="form-select"
                    v-model="registerForm.gender"
                    required
                  >
                    <option value="" disabled selected>اختر الجنس</option>
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label"
                    >العنوان الحالي <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="registerForm.address"
                    placeholder="المدينة / الحي"
                    required
                  />
                </div>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label"
                    >كلمة المرور <span class="text-danger">*</span></label
                  >
                  <input
                    type="password"
                    class="form-control"
                    v-model="registerForm.password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label"
                    >تأكيد كلمة المرور <span class="text-danger">*</span></label
                  >
                  <input
                    type="password"
                    class="form-control"
                    v-model="registerForm.password_confirmation"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label"
                  >إرفاق صورة الهوية الشخصية
                  <span class="text-danger">*</span></label
                >
                <div class="file-drop-zone" @click="triggerFileInput">
                  <i class="fas fa-cloud-upload-alt text-primary fs-3 mb-2"></i>
                  <p class="small text-muted mb-0" v-if="!fileName">
                    اضغط هنا لرفع صورة الهوية (JPG, PNG)
                  </p>
                  <p class="small text-success fw-bold mb-0" v-else>
                    <i class="fas fa-check-circle"></i> {{ fileName }}
                  </p>
                  <input
                    type="file"
                    ref="fileInput"
                    class="d-none"
                    accept="image/*"
                    @change="handleFileUpload"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100 btn-submit mb-4"
              >
                <i class="fas fa-user-plus me-2"></i> تسجيل وإرسال الملف للتوثيق
              </button>

              <p class="text-center text-muted small mb-0">
                لديك حساب بالفعل؟
                <span class="toggle-auth-link" @click="isLoginMode = true"
                  >تسجيل الدخول من هنا</span
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import { ref } from "vue";

    const isLoginMode = ref(true);
    const fileName = ref("");
    const fileInput = ref(null);

    const loginForm = ref({
    national_id: "",
    password: "",
    });

    const registerForm = ref({
    fullname: "",
    national_id: "",
    birth_date: "",
    phone: "",
    gender: "",
    address: "",
    password: "",
    password_confirmation: "",
    identity_image: null,
    });

    const triggerFileInput = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
    };

    const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        fileName.value = file.name;
        registerForm.value.identity_image = file;
    }
    };

    const handleLogin = () => {
    console.log(
        "بيانات تسجيل الدخول الجاهزة للإرسال إلى Laravel:",
        loginForm.value,
    );
    // الباك أند: هنا تقوم بربط البيانات مباشرة وإرسالها عبر Axios إلى Laravel
    // Example: axios.post('/api/login', loginForm.value);
    };

    const handleRegister = () => {
    console.log(
        "بيانات التسجيل الجاهزة للإرسال إلى Laravel:",
        registerForm.value,
    );
    // الباك أند: هنا تقوم ببناء الـ FormData لرفع الصورة مع الحقول إلى Laravel
    // Example: let data = new FormData(); ... axios.post('/api/register', data);
    };
</script>

<style scoped>
    @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css";

    :root {
    --primary-color: #0d6efd;
    --dark-blue: #0a2540;
    --light-bg: #f8f9fa;
    }

    .auth-page-wrapper {
    font-family: "Cairo", sans-serif;
    background: linear-gradient(
        135deg,
        rgba(13, 110, 253, 0.05) 0%,
        rgba(13, 202, 240, 0.1) 100%
    );
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    width: 100%;
    }

    .auth-container {
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(10, 37, 64, 0.08);
    overflow: hidden;
    max-width: 1000px;
    width: 90%;
    transition: all 0.4s ease;
    }

    .auth-sidebar {
    background: linear-gradient(135deg, #0a2540 0%, #1e3a5f 100%);
    color: #fff;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    }

    .auth-sidebar::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: url("https://img.freepik.com/free-vector/abstract-science-background-with-connecting-dots-lines_1017-31711.jpg")
        no-repeat center center/cover;
    opacity: 0.05;
    }

    .auth-form-wrapper {
    padding: 50px 40px;
    }

    .form-label {
    font-weight: 600;
    color: #0a2540;
    font-size: 0.9rem;
    }

    .form-control,
    .form-select {
    border-radius: 12px;
    padding: 12px 15px;
    border: 1.5px solid #e2e8f0;
    font-size: 0.95rem;
    transition: all 0.3s;
    }

    .form-control:focus,
    .form-select:focus {
    border-color: #0d6efd;
    box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1);
    outline: none;
    }

    .input-group-text {
    background-color: #f8f9fa;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    color: #a0aec0;
    }

    .btn-submit {
    padding: 12px;
    font-weight: 700;
    border-radius: 12px;
    font-size: 1.05rem;
    box-shadow: 0 6px 20px rgba(13, 110, 253, 0.25);
    transition: all 0.3s;
    }

    .btn-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(13, 110, 253, 0.35);
    }

    .toggle-auth-link {
    color: #0d6efd;
    text-decoration: none;
    font-weight: 700;
    cursor: pointer;
    }

    .file-drop-zone {
    border: 2px dashed #cbd5e1;
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    background: #f8fafc;
    cursor: pointer;
    transition: all 0.3s;
    }

    .file-drop-zone:hover {
    border-color: #0d6efd;
    background: rgba(13, 110, 253, 0.02);
    }
</style>
