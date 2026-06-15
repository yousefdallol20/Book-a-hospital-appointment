<template>
  <div id="app" dir="rtl">
    <nav class="navbar navbar-expand-lg navbar-light sticky-top">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <i class="fas fa-hospital-user text-primary fs-2 me-2"></i>
          <div class="ms-2">
            <span class="fw-bold d-block text-dark-blue lh-1 fs-4">مستشفى الشفاء</span>
            <small class="text-muted fs-7">مجمع العيادات الخارجية الإلكتروني</small>
          </div>
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link active" href="#hero">الرئيسية</a></li>
            <li class="nav-item"><a class="nav-link" href="#clinics">العيادات المتاحة</a></li>
            <li class="nav-item"><a class="nav-link" href="#instructions">إرشادات الحجز</a></li>
            <li class="nav-item"><a class="nav-link" href="#workhours">أوقات العمل</a></li>
            <li class="nav-item"><a class="nav-link" href="#faq">الأسئلة الشائعة</a></li>
            <li class="nav-item"><a class="nav-link" href="#contact">اتصل بنا</a></li>
          </ul>

          <div class="d-flex gap-2 ms-lg-3">
            <router-link :to="{ name: 'login' }" class="btn btn-outline-primary px-3 fw-bold rounded-pill">تسجيل الدخول</router-link>
            <router-link :to="{ name: 'login' }" class="btn btn-primary px-4 fw-bold rounded-pill shadow-sm">
              <i class="fas fa-calendar-check me-1"></i> احجز الآن
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <section id="hero" class="hero-section d-flex align-items-center">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 text-center text-lg-start">
            <span class="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-bold mb-3">رؤية تقنية جديدة ومتطورة</span>
            <h1 class="hero-title mb-4">احجز موعدك الطبي في <span>مستشفى الشفاء</span> بكل سهولة وشفافية</h1>
            <p class="lead text-muted mb-5">
              منظومة عصرية ذكية تهدف إلى تنظيم مواعيد المراجعات الطبية داخل أروقة العيادات الخارجية، تقليل الازدحام والتكدس، وضمان توزيع الأدوار بحيادية وعدالة برمجية صارمة.
            </p>
            <div class="d-sm-flex justify-content-center justify-content-lg-start gap-3">
              <a href="#register" class="btn btn-primary btn-lg cta-btn-lg mb-3 mb-sm-0"><i class="fas fa-user-plus me-2"></i> إنشاء حساب مريض جديد</a>
              <a href="#clinics" class="btn btn-outline-dark btn-lg px-4 rounded-pill py-3 fw-600"><i class="fas fa-stethoscope me-2"></i> استعرض العيادات</a>
            </div>

            <div class="row mt-5 pt-4 border-top text-center text-lg-start">
              <div class="col-4">
                <h3 class="fw-bold text-primary mb-0">50</h3>
                <small class="text-muted fw-bold">الحد الأقصى للحجوزات يومياً</small>
              </div>
              <div class="col-4">
                <h3 class="fw-bold text-primary mb-0">100%</h3>
                <small class="text-muted fw-bold">تنظيم رقمي للأدوار</small>
              </div>
              <div class="col-4">
                <h3 class="fw-bold text-primary mb-0">30 يوم</h3>
                <small class="text-muted fw-bold">سقف الحجز المستقبلي</small>
              </div>
            </div>
          </div>
          <div class="col-lg-6 d-none d-lg-block position-relative">
            <img src="https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg" alt="منظومة الشفاء" class="img-fluid rounded-3">
          </div>
        </div>
      </div>
    </section>

    <section id="clinics" class="py-5 bg-light">
      <div class="container py-4">
        <div class="text-center">
          <h2 class="section-title">أقسام العيادات الخارجية المتاحة</h2>
          <p class="text-muted max-w-600 mx-auto">اختر التخصص المطلوب لاستعراض تفاصيل المواعيد، حيث يتم الإغلاق التلقائي لليوم برمجياً عند بلوغ سقف الـ 50 حجزاً.</p>
        </div>
        <div class="row g-4 mt-2">
          <div v-for="clinic in clinics" :key="clinic.name" class="col-xl-3 col-md-6">
            <div class="card clinic-card h-100 p-4">
              <div class="clinic-icon">
                <i :class="clinic.icon"></i>
              </div>
              <h5 class="fw-bold text-dark-blue mb-3">{{ clinic.name }}</h5>
              <p class="text-muted small mb-3">{{ clinic.description }}</p>
              <div class="d-flex justify-content-between align-items-center mt-auto border-top pt-3">
                <span class="badge bg-success-subtle text-success rounded-pill px-2 py-1 small">الحجز متاح</span>
                <a href="#register" class="btn btn-sm btn-link text-primary fw-bold p-0 text-decoration-none">
                  احجز دوراً <i class="fas fa-chevron-left ms-1 small"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="instructions" class="py-5">
      <div class="container py-4">
        <div class="text-center mb-5">
          <h2 class="section-title">شروط وسياسات منظومة الحجز الإلكتروني</h2>
          <p class="text-muted">نرجو قراءة التعليمات والالتزام التام بالضوابط البرمجية المعتمدة لضمان حقك وحق الآخرين في العلاج.</p>
        </div>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card instruction-step h-100 p-4 border-0 shadow-sm">
              <div class="step-number">1</div>
              <h5 class="fw-bold mb-2 text-dark-blue">سقف الحجوزات اليومي</h5>
              <p class="text-muted small mb-0">لكل قسم سقف محدد بـ 50 حجزاً فقط في اليوم. وبمجرد اكتمال العدد يُغلق اليوم تلقائياً وتتحول الحجوزات لليوم التالي.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card instruction-step h-100 p-4 border-0 shadow-sm">
              <div class="step-number">2</div>
              <h5 class="fw-bold mb-2 text-dark-blue">منع الاحتكار والتكرار</h5>
              <p class="text-muted small mb-0">برمجياً، لا يُسمح للمريض بحجز موعد جديد في نفس التخصص طالما يمتلك حجزاً قائماً ونشطاً لم يأتِ موعده بعد.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card instruction-step h-100 p-4 border-0 shadow-sm">
              <div class="step-number">3</div>
              <h5 class="fw-bold mb-2 text-danger"><i class="fas fa-exclamation-triangle me-1"></i> سياسة الغياب والحظر</h5>
              <p class="text-muted small mb-0">المريض الذي يتغيب عن موعده لمرتين متتاليتين دون إلغاء مسبق بـ 24 ساعة، يتم حظره تلقائياً من الحجز الإلكتروني لمدة 30 يوماً.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="workhours" class="py-5 bg-light">
      <div class="container py-4">
        <div class="text-center">
          <h2 class="section-title">جدول تفصيلي بأوقات تشغيل العيادات الخارجية</h2>
          <p class="text-muted">مواعيد العمل الرسمية الموزعة على مدار الأسبوع لاستقبال المراجعين المثبت حضورهم إلكترونياً.</p>
        </div>
        <div class="row justify-content-center mt-4">
          <div class="col-lg-10">
            <div class="table-responsive timetable-wrapper">
              <table class="table table-custom table-hover text-center mb-0">
                <thead>
                  <tr>
                    <th>اليوم</th>
                    <th>ساعات العمل الموحدة</th>
                    <th>العيادات المناوبة</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="schedule in schedules" :key="schedule.day">
                    <td class="fw-bold text-dark-blue">{{ schedule.day }}</td>
                    <td><span class="badge bg-light text-dark border p-2 fs-6 fw-normal">{{ schedule.hours }}</span></td>
                    <td><span class="text-primary fw-bold">{{ schedule.clinics }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="py-5">
      <div class="container py-4">
        <div class="text-center mb-5">
          <h2 class="section-title">الأسئلة الشائعة إجابات عن أبرز تساؤلات المرضى</h2>
          <p class="text-muted">إجابات برمجية وإدارية فورية لتسهيل استخدام المنظومة دون الحاجة للاتصال بالدعم الفني.</p>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="accordion" id="faqAccordion">
              <div v-for="(item, index) in faqs" :key="index" class="accordion-item">
                <h2 class="accordion-header" :id="'heading' + index">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index">
                    {{ item.question }}
                  </button>
                </h2>
                <div :id="'collapse' + index" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body text-muted lh-lg">
                    {{ item.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="py-5 bg-light">
      <div class="container py-4">
        <div class="text-center">
          <h2 class="section-title">قنوات التواصل والموقع الجغرافي للمستشفى</h2>
          <p class="text-muted">نحن هنا لخدمتكم؛ تواصل معنا في حال وجود صعوبات تقنية أو استفسارات عاجلة.</p>
        </div>
        <div class="row g-4 mt-3 align-items-center">
          <div class="col-lg-5">
            <div class="card border-0 p-4 rounded-4 shadow-sm h-100">
              <h4 class="fw-bold text-dark-blue mb-4">بيانات الاتصال الفوري</h4>
              <div class="d-flex align-items-center mb-4">
                <div class="bg-primary text-white p-3 rounded-circle me-3"><i class="fas fa-phone-alt"></i></div>
                <div class="ms-2">
                  <small class="text-muted d-block">الرقم الموحد المباشر</small>
                  <span class="fw-bold fs-5 text-dark-blue">+970 (08) 284-XXXX</span>
                </div>
              </div>
              <div class="d-flex align-items-center mb-4">
                <div class="bg-success text-white p-3 rounded-circle me-3"><i class="fab fa-whatsapp"></i></div>
                <div class="ms-2">
                  <small class="text-muted d-block">استفسارات واتساب العاجلة</small>
                  <span class="fw-bold fs-5 text-dark-blue">+970 59-XXXXXXX</span>
                </div>
              </div>
              <div class="d-flex align-items-center mb-4">
                <div class="bg-info text-white p-3 rounded-circle me-3"><i class="fas fa-envelope"></i></div>
                <div class="ms-2">
                  <small class="text-muted d-block">البريد الإلكتروني للدعم الفني</small>
                  <span class="fw-bold text-dark-blue">support@shifa-hospital.ps</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="map-container">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.1275468756315!2d34.4442654!3d31.5206254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14fd7f0df8ab306d%3A0xc6cbfa21a8cd2892!2z2YXYs9iq2LTYgdmZiNinINin2YTYtdir2KfYow!5e0!3m2!1sar!2s!4v1700000000000!5m2!1sar!2s" width="100%" height="380" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-5">
            <h5 class="d-flex align-items-center text-white"><i class="fas fa-hospital-user text-primary fs-3 me-2"></i> مجمع الشفاء الطبي</h5>
            <p class="small text-muted lh-lg pe-lg-4">
              نظام الحجوزات الإلكتروني المتكامل للعيادات الخارجية بمستشفى الشفاء. نسعى لتوفير أرقى الخدمات الطبية الرقمية الميسرة لأهلنا بما يواكب أحدث المتطلبات والتقنيات البرمجية العالمية.
            </p>
            <div class="social-icons mt-4">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <h5>روابط سريعة</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="#hero">الرئيسية والتعريف</a></li>
              <li class="mb-2"><a href="#clinics">الأقسام والعيادات</a></li>
              <li class="mb-2"><a href="#instructions">سياسات وإرشادات الحجز</a></li>
              <li class="mb-2"><a href="#faq">الأسئلة المتكررة FAQ</a></li>
            </ul>
          </div>
          <div class="col-md-4 col-6">
            <h5>التحقق والتأكيد المركزي</h5>
            <p class="small text-muted mb-3">إذا كنت قادماً للمستشفى، تأكد من إحضار بطاقة الهوية المسجلة لتأكيد حضورك عند شباك الاستقبال فوراً.</p>
            <a href="#register" class="btn btn-sm btn-primary px-3 rounded-pill">ابدأ تسجيل حسابك الآن</a>
          </div>
        </div>
        <div class="text-center mt-5 pt-4 border-top border-secondary-subtle">
          <p class="small mb-0 text-muted">© 2026 مستشفى الشفاء الطبي - جميع الحقوق محفوظة برمجياً.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const clinics = ref([
    {
      name: "عيادة الباطنة العامة",
      icon: "fas fa-heartbeat",
      description: "تشمل الفحوصات الدورية، متابعة الضغط والسكري والأمراض المزمنة بانتظام."
    },
    {
      name: "عيادة جراحة العظام",
      icon: "fas fa-bone",
      description: "متخصصة في علاج الكسور، المفاصل، العمود الفقري والتشوهات الهيكلية."
    },
    {
      name: "عيادة الأطفال والرضع",
      icon: "fas fa-baby",
      description: "متابعة شاملة لنمو الأطفال، الأمراض الحادة، ومراجعات الفحص الطبي لحديثي الولادة."
    },
    {
      name: "عيادة الأنف والأذن والحنجرة",
      icon: "fas fa-headset",
      description: "تشمل فحوصات السمع، التهابات اللوزتين، والجيوب الأنفية المزمنة ومتابعتها."
    },
    {
      name: "عيادة طب وجراحة العيون",
      icon: "fas fa-eye",
      description: "قياس النظر، فحص قاع العين، وعلاج اعتلالات الشباكية وضغط العين برقم رقمي دوري."
    },
    {
      name: "عيادة الجراحة العامة",
      icon: "fas fa-scalpel",
      description: "استشارات ما قبل العمليات ومتابعة الغيارات الطبية الجراحية وإزالة الغرز الفورية."
    },
    {
      name: "عيادة أمراض النساء والولادة",
      icon: "fas fa-female",
      description: "رعاية كاملة للأم الحامل، التصوير التلفزيوني السونار ومتابعة الهرمونات الدورية."
    },
    {
      name: "عيادة الجلدية والتناسلية",
      icon: "fas fa-allergies",
      description: "علاج الحساسية المزمنة، الإكزيما، والأمراض الجلدية المعدية والمتابعة الوقائية."
    }
  ]);

  const schedules = ref([
    {
      day: "السبت",
      hours: "08:00 صباحاً - 04:30 مساءً",
      clinics: "الباطنة، الأطفال، العظام"
    },
    {
      day: "الأحد",
      hours: "08:00 صباحاً - 04:30 مساءً",
      clinics: "العيون، الجراحة، الأنف والأذن"
    },
    {
      day: "الإثنين",
      hours: "08:00 صباحاً - 04:30 مساءً",
      clinics: "الجلدية، الباطنة، النساء والولادة"
    },
    {
      day: "الثلاثاء",
      hours: "08:00 صباحاً - 04:30 مساءً",
      clinics: "الأطفال، العظام, الجراحة العامة"
    },
    {
      day: "الأربعاء",
      hours: "08:00 صباحاً - 04:30 مساءً",
      clinics: "العيون، الجلدية، النساء والولادة"
    },
    {
      day: "الخميس",
      hours: "08:00 صباحاً - 02:00 مساءً",
      clinics: "العيادات المناوبة والطوارئ فقط"
    }
  ]);

  const faqs = ref([
    {
      question: "كيف يستطيع ابني الصغير الحجز في النظام وليس لديه رقم هوية مستقل؟",
      answer: "عند الدخول إلى صفحة (إنشاء مستخدم جديد)، تم توفير حقل برمجى مخصص يسمى (رقم هوية الأب/ولي الأمر)، حيث يتم ربط حساب الطفل الصغير بهوية الأب كحساب تابع، ليسهل على موظف الشباك إيجاد الطفل وتثبيت دوره."
    },
    {
      question: "ماذا يحدث إذا امتلأ سقف الـ 50 حجزاً في اليوم الذي أريده؟",
      answer: "يقوم إطار Laravel خلف الكواليس بعمل كاونت فوري للحجوزات النشطة؛ إذا بلغت 50 حجزاً، يقوم النظام تلقائياً وبشكل صارم بإغلاق هذا اليوم برمجياً، ويقترح عليك النظام الموعد المتاح التالي مباشرة لضمان توزيع عادل للأدوار."
    },
    {
      question: "لقد حجزت موعداً لكني لن أستطيع الحضور، ما العمل لتفادي عقوبة الحظر؟",
      answer: "يجب عليك الدخول إلى لوحة تحكم المريض الخاصة بك والنقر على زر (إلغاء الحجز) قبل الموعد بـ 24 ساعة على الأقل. المريض الذي يتغيب لمرتين متتاليتين دون إلغاء مسبق يحظر حسابه إلكترونياً لمدة 30 يوماً كإجراء رادع لمنع تعطيل الأدوار."
    },
    {
      question: "أنا مريض لا أملك هاتفاً ذكياً أو إنترنت، كيف يمكنني حجز موعد طبي؟",
      answer: "لقد خصصنا منفذاً موازياً يدوياً لدى موظف الشباك في المستشفى؛ يمكنك الحضور مباشرة وتقديم رقم هويتك للموظف، وسيقوم هو بالبحث عنك وحجز مقعد لك من المقاعد المتبقية من الـ 50 مقعداً وطباعة التذكرة الرقمية لك فوراً من طابعة الشباك."
    }
  ]);
</script>

<style scoped>
  @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css";
  @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
  @import "https://fonts.googleapis.com";
  @import "https://fonts.gstatic.com";
  @import "https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&display=swap";

  :root {
    --primary-color: #0d6efd;
    --secondary-color: #0dcaf0;
    --dark-blue: #0a2540;
    --light-bg: #f8f9fa;
    --accent-color: #ffc107;
    --success-color: #198754;
  }

  #app {
    font-family: "Cairo", sans-serif;
    background-color: #ffffff;
    color: #333;
    overflow-x: hidden;
  }

  .text-dark-blue {
    color: #0a2540 !important;
  }

  /* الهيدر والقائمة */
  .navbar {
    background-color: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .navbar-brand img {
    max-height: 50px;
  }

  .nav-link {
    color: #0a2540 !important;
    font-weight: 600;
    margin: 0 5px;
    transition: color 0.3s ease;
  }

  .nav-link:hover,
  .nav-link.active {
    color: #0d6efd !important;
  }

  /* قسم الهيرو */
  .hero-section {
    background: linear-gradient(135deg, rgba(13, 110, 253, 0.04) 0%, rgba(13, 202, 240, 0.08) 100%);
    padding: 140px 0 100px 0;
    position: relative;
  }

  .hero-section::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: url("https://img.freepik.com/free-vector/abstract-science-background-with-connecting-dots-lines_1017-31711.jpg") no-repeat center center/cover;
    opacity: 0.05;
    pointer-events: none;
  }

  .hero-title {
    font-size: 2.8rem;
    font-weight: 800;
    color: #0a2540;
    line-height: 1.4;
  }

  .hero-title span {
    color: #0d6efd;
  }

  .cta-btn-lg {
    padding: 15px 40px;
    font-size: 1.15rem;
    font-weight: 700;
    border-radius: 50px;
    box-shadow: 0 10px 25px rgba(13, 110, 253, 0.3);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .cta-btn-lg:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(13, 110, 253, 0.4);
  }

  /* بطاقات الأقسام */
  .section-title {
    font-weight: 700;
    color: #0a2540;
    position: relative;
    margin-bottom: 45px;
  }

  .section-title::after {
    content: "";
    position: absolute;
    bottom: -10px;
    right: 50%;
    transform: translateX(50%);
    width: 60px;
    height: 4px;
    background-color: #0d6efd;
    border-radius: 2px;
  }

  .clinic-card {
    border: none;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    transition: all 0.3s ease;
    overflow: hidden;
    border-top: 4px solid transparent;
  }

  .clinic-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(13, 110, 253, 0.1);
    border-top-color: #0d6efd;
  }

  .clinic-icon {
    width: 70px;
    height: 70px;
    background: rgba(13, 110, 253, 0.1);
    color: #0d6efd;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }

  .clinic-card:hover .clinic-icon {
    background: #0d6efd;
    color: #fff;
  }

  /* جدول مواعيد العمل المطور */
  .timetable-wrapper {
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.05);
    padding: 30px;
  }

  .table-custom th {
    background-color: #0a2540;
    color: #fff;
    font-weight: 600;
    padding: 15px;
    border: none;
  }

  .table-custom td {
    padding: 15px;
    vertical-align: middle;
  }

  /* التوجيهات والإرشادات */
  .instruction-step {
    text-align: center;
    position: relative;
  }

  .step-number {
    width: 50px;
    height: 50px;
    background: #0d6efd;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0 auto 20px auto;
    box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3);
  }

  /* الأسئلة الشائعة Accordion */
  .accordion-item {
    border: none;
    margin-bottom: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
    border-radius: 12px !important;
    overflow: hidden;
  }

  .accordion-button {
    font-weight: 600;
    color: #0a2540;
    background-color: #fff;
  }

  .accordion-button:not(.collapsed) {
    background-color: rgba(13, 110, 253, 0.05);
    color: #0d6efd;
  }

  /* خرائط جوجل */
  .map-container {
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  }

  /* الفوتر العريض */
  footer {
    background-color: #0a2540;
    color: #a0aec0;
    padding: 70px 0 20px 0;
  }

  footer h5 {
    color: #fff;
    font-weight: 700;
    margin-bottom: 25px;
  }

  footer a {
    color: #a0aec0;
    text-decoration: none;
    transition: color 0.3s;
  }

  footer a:hover {
    color: #0dcaf0;
  }

  .social-icons a {
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    color: #fff;
    margin-left: 10px;
    transition: all 0.3s;
  }

  .social-icons a:hover {
    background: #0d6efd;
    transform: translateY(-3px);
  }
</style>