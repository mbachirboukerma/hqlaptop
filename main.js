// كود جافاسكريبت المنسوخ من index.html
// عداد تنازلي للعرض (مثلاً ينتهي بعد 2 يوم)
function startCountdown(duration) {
  const countdown = document.getElementById('countdown');
  let endTime = localStorage.getItem('countdownEndTime');
  
  if (!endTime) {
    // إذا لم يكن هناك وقت محدد، ضع وقت انتهاء جديد (48 ساعة من الآن)
    endTime = Date.now() + (2 * 24 * 60 * 60 * 1000);
    localStorage.setItem('countdownEndTime', endTime);
  }

  function updateCountdown() {
    const now = Date.now();
    const timeLeft = endTime - now;

    if (timeLeft <= 0) {
      // إذا انتهى الوقت، امسح التخزين وابدأ من جديد
      localStorage.removeItem('countdownEndTime');
      endTime = Date.now() + (2 * 24 * 60 * 60 * 1000);
      localStorage.setItem('countdownEndTime', endTime);
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdown.textContent = `${days}ي ${hours}س ${minutes}د ${seconds}ث`;
  }

  // تحديث العداد كل ثانية
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// بدء العداد
startCountdown();

// تهيئة كاروسيل المنتج
const productItems = document.querySelectorAll('#default-carousel [data-carousel-item]');
const productIndicators = document.querySelectorAll('#default-carousel [data-carousel-slide-to]');
const productPrevButton = document.querySelector('#default-carousel [data-carousel-prev]');
const productNextButton = document.querySelector('#default-carousel [data-carousel-next]');
let productCurrentIndex = 0;

function showProductSlide(index) {
  // إخفاء جميع العناصر
  productItems.forEach(item => {
    item.classList.add('hidden');
    item.removeAttribute('data-carousel-item');
  });
  
  // إظهار العنصر الحالي
  productItems[index].classList.remove('hidden');
  productItems[index].setAttribute('data-carousel-item', 'active');
  
  // تحديث المؤشرات
  productIndicators.forEach((indicator, i) => {
    if (i === index) {
      indicator.classList.remove('border-[#DFF6FF]');
      indicator.classList.add('border-[#571399]');
      indicator.setAttribute('aria-current', 'true');
    } else {
      indicator.classList.remove('border-[#571399]');
      indicator.classList.add('border-[#DFF6FF]');
      indicator.setAttribute('aria-current', 'false');
    }
  });
  
  productCurrentIndex = index;
}

// إضافة مستمعي الأحداث لكاروسيل المنتج
productPrevButton.addEventListener('click', () => {
  showProductSlide((productCurrentIndex - 1 + productItems.length) % productItems.length);
});

productNextButton.addEventListener('click', () => {
  showProductSlide((productCurrentIndex + 1) % productItems.length);
});

productIndicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    showProductSlide(index);
  });
});

// التنقل التلقائي لكاروسيل المنتج
let productAutoSlideInterval = setInterval(() => {
  showProductSlide((productCurrentIndex + 1) % productItems.length);
}, 3000);

// إيقاف التنقل التلقائي عند تحريك الماوس فوق كاروسيل المنتج
const productCarousel = document.getElementById('default-carousel');
productCarousel.addEventListener('mouseenter', () => {
  clearInterval(productAutoSlideInterval);
});

// إعادة تشغيل التنقل التلقائي عند إزالة الماوس
productCarousel.addEventListener('mouseleave', () => {
  productAutoSlideInterval = setInterval(() => {
    showProductSlide((productCurrentIndex + 1) % productItems.length);
  }, 3000);
});

// عرض الشريحة الأولى لكاروسيل المنتج عند التحميل
showProductSlide(0);

// تهيئة كاروسيل التعليقات
const testimonialItems = document.querySelectorAll('#testimonials-carousel [data-carousel-item]');
const testimonialIndicators = document.querySelectorAll('#testimonials-carousel [data-carousel-slide-to]');
let testimonialCurrentIndex = 0;

function showTestimonialSlide(index) {
  testimonialItems.forEach(item => {
    item.classList.add('hidden');
    item.removeAttribute('data-carousel-item');
  });
  
  testimonialItems[index].classList.remove('hidden');
  testimonialItems[index].setAttribute('data-carousel-item', 'active');
  
  testimonialIndicators.forEach((indicator, i) => {
    if (i === index) {
      indicator.classList.remove('bg-[#DFF6FF]');
      indicator.classList.add('bg-[#571399]');
    } else {
      indicator.classList.remove('bg-[#571399]');
      indicator.classList.add('bg-[#DFF6FF]');
    }
  });
  
  testimonialCurrentIndex = index;
}

// التنقل التلقائي للتعليقات
let testimonialAutoSlideInterval = setInterval(() => {
  showTestimonialSlide((testimonialCurrentIndex + 1) % testimonialItems.length);
}, 5000);

// إيقاف التنقل التلقائي عند تحريك الماوس فوق كاروسيل التعليقات
const testimonialCarousel = document.getElementById('testimonials-carousel');
testimonialCarousel.addEventListener('mouseenter', () => {
  clearInterval(testimonialAutoSlideInterval);
});

testimonialCarousel.addEventListener('mouseleave', () => {
  testimonialAutoSlideInterval = setInterval(() => {
    showTestimonialSlide((testimonialCurrentIndex + 1) % testimonialItems.length);
  }, 5000);
});

// المؤشرات لكاروسيل التعليقات
testimonialIndicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    showTestimonialSlide(index);
    // أعد تشغيل المؤقت التلقائي عند الضغط على المؤشر
    clearInterval(testimonialAutoSlideInterval);
    testimonialAutoSlideInterval = setInterval(() => {
      showTestimonialSlide((testimonialCurrentIndex + 1) % testimonialItems.length);
    }, 5000);
  });
});

// عرض التعليق الأول عند التحميل
showTestimonialSlide(0);

// --- ربط قوائم الولاية/الدائرة/البلدية ---
let dzData = [];
let wilayaSelect = document.getElementById('wilaya-select');
let dairaSelect = document.getElementById('daira-select');
let communeSelect = document.getElementById('commune-select');
let addressInput = document.getElementById('address-input');

fetch('algeria_cities.json')
  .then(res => res.json())
  .then(data => {
    dzData = data;
    // استخراج الولايات بدون تكرار
    const wilayas = [...new Set(dzData.map(item => item.wilaya_name.trim()))];
    wilayas.sort((a, b) => a.localeCompare(b, 'ar'));
    wilayas.forEach(wilaya => {
      let opt = document.createElement('option');
      opt.value = wilaya;
      opt.textContent = wilaya;
      wilayaSelect.appendChild(opt);
    });
  });

wilayaSelect.addEventListener('change', function() {
  dairaSelect.innerHTML = '<option value="">اختر الدائرة</option>';
  communeSelect.innerHTML = '<option value="">اختر البلدية</option>';
  communeSelect.disabled = true;
  addressInput.style.display = 'none';
  if (!this.value) {
    dairaSelect.disabled = true;
    return;
  }
  dairaSelect.disabled = false;
  // استخراج الدوائر الخاصة بالولاية
  const dairas = [...new Set(dzData.filter(item => item.wilaya_name.trim() === this.value).map(item => item.daira_name.trim()))];
  dairas.sort((a, b) => a.localeCompare(b, 'ar'));
  dairas.forEach(daira => {
    let opt = document.createElement('option');
    opt.value = daira;
    opt.textContent = daira;
    dairaSelect.appendChild(opt);
  });
});

dairaSelect.addEventListener('change', function() {
  communeSelect.innerHTML = '<option value="">اختر البلدية</option>';
  addressInput.style.display = 'none';
  if (!this.value) {
    communeSelect.disabled = true;
    return;
  }
  communeSelect.disabled = false;
  // استخراج البلديات الخاصة بالدائرة والولاية
  const communes = dzData.filter(item => item.wilaya_name.trim() === wilayaSelect.value && item.daira_name.trim() === this.value).map(item => item.commune_name.trim());
  communes.sort((a, b) => a.localeCompare(b, 'ar'));
  communes.forEach(commune => {
    let opt = document.createElement('option');
    opt.value = commune;
    opt.textContent = commune;
    communeSelect.appendChild(opt);
  });
});

communeSelect.addEventListener('change', function() {
  if (this.value) {
    addressInput.style.display = '';
    // إظهار شركة التوصيل والفاتورة
    deliveryCompany.style.display = '';
    invoice.style.display = '';
  } else {
    addressInput.style.display = 'none';
    // إخفاء شركة التوصيل والفاتورة
    deliveryCompany.style.display = 'none';
    invoice.style.display = 'none';
  }
});

// --- فاتورة صغيرة ---
const qtyInput = document.getElementById('qty-input');
const deliveryCompany = document.getElementById('delivery-company');
const invoice = document.getElementById('mini-invoice');
const invoicePC = document.getElementById('invoice-pc');
const invoiceShipping = document.getElementById('invoice-shipping');
const invoiceShippingRow = document.getElementById('invoice-shipping-row');
const invoiceTotal = document.getElementById('invoice-total');
const PC_PRICE = 53000;
const SHIPPING_OFFICE = 600;
const SHIPPING_HOME = 850;

function updateInvoice() {
  const qty = parseInt(qtyInput.value) || 1;
  const deliveryType = document.querySelector('input[name="delivery"]:checked')?.value;
  let shipping = 0;
  let shippingOriginal = 0;
  if (deliveryCompany.value) {
    if (deliveryType === 'office') {
      shippingOriginal = SHIPPING_OFFICE;
    } else if (deliveryType === 'home') {
      shippingOriginal = SHIPPING_HOME;
    }
  }
  // العرض: التوصيل مجاني
  const total = PC_PRICE * qty;
  invoicePC.textContent = (PC_PRICE * qty).toLocaleString('ar-DZ') + ' دج';
  if (deliveryCompany.value && shippingOriginal > 0) {
    invoiceShipping.innerHTML = `<span class='line-through text-gray-400 mr-2'>${shippingOriginal.toLocaleString('ar-DZ')} دج</span> <span class='text-green-600 font-bold'>0 دج</span>`;
    invoiceShippingRow.style.display = '';
  } else {
    invoiceShippingRow.style.display = 'none';
  }
  invoiceTotal.textContent = total.toLocaleString('ar-DZ') + ' دج';
}
qtyInput.addEventListener('input', updateInvoice);
deliveryCompany.addEventListener('change', updateInvoice);
document.querySelectorAll('input[name="delivery"]').forEach(radio => {
  radio.addEventListener('change', updateInvoice);
});
// عرض الفاتورة عند أول تحميل
updateInvoice();

// تحقق من صحة رقم الهاتف
const phoneInput = document.getElementById('phone-input');
const phoneError = document.getElementById('phone-error');
const submitBtn = document.getElementById('submit-btn');
function validatePhone() {
  const value = phoneInput.value.trim();
  const valid = /^(05|06|07)\d{8}$/.test(value);
  if (!valid) {
    phoneInput.classList.add('ring-2', 'ring-red-500');
    phoneInput.classList.remove('ring-green-500');
    phoneError.classList.remove('hidden');
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-60', 'cursor-not-allowed');
  } else {
    phoneInput.classList.remove('ring-red-500');
    phoneInput.classList.add('ring-green-500');
    phoneError.classList.add('hidden');
    submitBtn.disabled = false;
    submitBtn.classList.remove('opacity-60', 'cursor-not-allowed');
  }
  return valid;
}
phoneInput.addEventListener('input', validatePhone);
// منع الإرسال إذا الرقم غير صحيح
const orderForm = document.getElementById('order-form');
const successStep = document.getElementById('success-step');
const newOrderBtn = document.getElementById('new-order-btn');
orderForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (!validatePhone()) return;
  // إخفاء الفورم وإظهار رسالة النجاح
  orderForm.style.display = 'none';
  successStep.classList.remove('hidden');
  // يمكنك هنا إرسال البيانات فعلياً عبر fetch/ajax
  // showToast('✅ تم إرسال طلبك بنجاح! سنقوم بالتواصل معك قريباً', 'success');
});
// زر طلب جديد
newOrderBtn.addEventListener('click', function() {
  orderForm.reset();
  updateInvoice();
  validatePhone();
  orderForm.style.display = '';
  successStep.classList.add('hidden');
});

// Toast للنجاح/الفشل
const toast = document.getElementById('form-toast');
const toastMsg = document.getElementById('toast-msg');
const toastIcon = document.getElementById('toast-icon');
function showToast(msg, type = 'success') {
  toastMsg.textContent = msg;
  if (type === 'success') {
    toast.classList.remove('border-red-400', 'text-red-700');
    toast.classList.add('border-green-400', 'text-green-700');
    toastIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>';
  } else {
    toast.classList.remove('border-green-400', 'text-green-700');
    toast.classList.add('border-red-400', 'text-red-700');
    toastIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>';
  }
  toast.classList.remove('opacity-0', 'pointer-events-none');
  setTimeout(() => {
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 3500);
}

// إشعارات الطلبات الحية
const cities = [
  'الجزائر العاصمة', 'وهران', 'قسنطينة', 'عنابة', 'سطيف', 'باتنة', 'بجاية', 'تيزي وزو',
  'جيجل', 'سكيكدة', 'الشلف', 'مستغانم', 'تلمسان', 'سيدي بلعباس', 'عنابة', 'قالمة',
  'سوق أهراس', 'تبسة', 'خنشلة', 'بسكرة', 'الوادي', 'ورقلة', 'غرداية', 'المنيعة',
  'تمنراست', 'أدرار', 'بشار', 'تندوف', 'أرزيو', 'مستغانم', 'غليزان', 'تيارت',
  'المدية', 'البليدة', 'عين الدفلى', 'تيبازة', 'البويرة', 'برج بوعريريج', 'بومرداس',
  'الطارف', 'سعيدة', 'النعامة', 'عين تموشنت', 'غليزان', 'معسكر', 'سعيدة', 'سيدي بلعباس'
];

const names = [
  'أحمد', 'محمد', 'عمر', 'يوسف', 'علي', 'عبد الله', 'مصطفى', 'خالد', 'عبد الرحمن',
  'أمين', 'بشير', 'طارق', 'سعيد', 'فاروق', 'كمال', 'نور الدين', 'عبد الحميد', 'عبد الكريم',
  'عبد المالك', 'عبد الوهاب', 'عبد العزيز', 'عبد الغني', 'عبد الرزاق', 'عبد السلام', 'عبد القادر'
];

function showLiveNotification() {
  const notificationsContainer = document.getElementById('live-notifications');
  const city = cities[Math.floor(Math.random() * cities.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  
  const notification = document.createElement('div');
  notification.className = 'bg-white/90 backdrop-blur-sm border-r-4 border-[#571399] rounded-lg shadow-lg p-3 text-[#1D283B] text-sm animate-[fadeIn_0.5s_ease-out]';
  notification.innerHTML = `
    <div class="flex items-center gap-2">
      <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span class="font-bold">${name}</span>
      <span>من</span>
      <span class="font-bold text-[#571399]">${city}</span>
      <span>طلب قبل قليل</span>
    </div>
  `;
  
  notificationsContainer.appendChild(notification);
  
  // إزالة الإشعار بعد 5 ثواني
  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.5s ease-out forwards';
    setTimeout(() => notification.remove(), 500);
  }, 5000);
}

// إضافة إشعار كل دقيقة
function startLiveNotifications() {
  // أول إشعار بعد 10 ثواني
  setTimeout(() => {
    showLiveNotification();
    
    // ثم إشعار كل دقيقة
    setInterval(() => {
      showLiveNotification();
    }, 60000); // 60 ثانية = دقيقة واحدة
  }, 10000); // 10 ثواني
}

// بدء الإشعارات عند تحميل الصفحة
startLiveNotifications(); 