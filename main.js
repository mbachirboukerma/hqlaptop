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

// --- تأثير زوم على صور كاروسيل المنتج عند الضغط ---
// فقط الصور الكبيرة داخل الكاروسيل
const productMainImages = document.querySelectorAll('#default-carousel .h-80 img');
productMainImages.forEach(img => {
  img.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
  img.addEventListener('click', function(e) {
    e.stopPropagation();
    img.classList.add('scale-110');
    // إزالة الزوم عند الضغط خارج الصورة أو بعد ثانية
    const removeZoom = () => img.classList.remove('scale-110');
    setTimeout(removeZoom, 1000);
    document.addEventListener('click', removeZoom, { once: true });
  });
});

// --- Lightbox لصور المنتج ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let lightboxIndex = 0;
const productMainImagesArr = Array.from(document.querySelectorAll('#default-carousel .h-80 img'));
const productMainImagesSrcs = productMainImagesArr.map(img => img.src);

function openLightbox(index) {
  if (!lightbox) return;
  lightboxIndex = index;
  lightboxImg.src = productMainImagesSrcs[lightboxIndex];
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
}
function showLightboxImg(index) {
  lightboxIndex = (index + productMainImagesSrcs.length) % productMainImagesSrcs.length;
  lightboxImg.src = productMainImagesSrcs[lightboxIndex];
}
// فتح اللايتبوكس عند الضغط على صورة كبيرة
productMainImagesArr.forEach((img, i) => {
  img.addEventListener('click', e => {
    e.preventDefault();
    openLightbox(i);
  });
});
// زر إغلاق
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
// زر التالي والسابق
if (lightboxNext) lightboxNext.addEventListener('click', () => showLightboxImg(lightboxIndex + 1));
if (lightboxPrev) lightboxPrev.addEventListener('click', () => showLightboxImg(lightboxIndex - 1));
// إغلاق عند الضغط خارج الصورة
if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
}
// إغلاق عند الضغط على Esc
window.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('hidden')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightboxImg(lightboxIndex - 1);
    if (e.key === 'ArrowRight') showLightboxImg(lightboxIndex + 1);
  }
});

// --- دعم السحب باللمس (Swipe) في Lightbox ---
let lbTouchStartX = null;
let lbTouchEndX = null;
if (lightboxImg) {
  lightboxImg.addEventListener('touchstart', function(e) {
    lbTouchStartX = e.changedTouches[0].screenX;
  });
  lightboxImg.addEventListener('touchend', function(e) {
    lbTouchEndX = e.changedTouches[0].screenX;
    if (lbTouchStartX !== null && lbTouchEndX !== null) {
      const diff = lbTouchEndX - lbTouchStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          showLightboxImg(lightboxIndex + 1);
        } else {
          showLightboxImg(lightboxIndex - 1);
        }
      }
    }
    lbTouchStartX = null;
    lbTouchEndX = null;
  });
}
// --- دعم التكبير الإضافي عند النقر المزدوج ---
let lastTap = 0;
let zoomed = false;
if (lightboxImg) {
  lightboxImg.addEventListener('click', function(e) {
    const now = Date.now();
    if (now - lastTap < 350) {
      // Double click/tap
      zoomed = !zoomed;
      if (zoomed) {
        lightboxImg.style.transform = 'scale(2)';
        lightboxImg.style.cursor = 'zoom-out';
      } else {
        lightboxImg.style.transform = '';
        lightboxImg.style.cursor = '';
      }
    }
    lastTap = now;
  });
}
// عند إغلاق اللايتبوكس أعد الصورة للوضع العادي
if (lightboxClose) lightboxClose.addEventListener('click', () => {
  zoomed = false;
  if (lightboxImg) {
    lightboxImg.style.transform = '';
    lightboxImg.style.cursor = '';
  }
});
if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      zoomed = false;
      if (lightboxImg) {
        lightboxImg.style.transform = '';
        lightboxImg.style.cursor = '';
      }
    }
  });
}

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
  // سكرول تلقائي لأعلى رسالة النجاح في الموبايل
  if (window.innerWidth < 768) {
    setTimeout(() => {
      successStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100); // تأخير بسيط لضمان ظهور العنصر
  }
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

// دعم السحب باللمس (Swipe) للكاروسيل الرئيسي للمنتج
let touchStartX = null;
let touchEndX = null;
productCarousel.addEventListener('touchstart', function(e) {
  touchStartX = e.changedTouches[0].screenX;
});
productCarousel.addEventListener('touchend', function(e) {
  touchEndX = e.changedTouches[0].screenX;
  if (touchStartX !== null && touchEndX !== null) {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) { // عتبة السحب
      if (diff < 0) {
        // سحب لليسار: صورة تالية
        showProductSlide((productCurrentIndex + 1) % productItems.length);
      } else {
        // سحب لليمين: صورة سابقة
        showProductSlide((productCurrentIndex - 1 + productItems.length) % productItems.length);
      }
    }
  }
  touchStartX = null;
  touchEndX = null;
});

// --- حفظ واسترجاع بيانات الفورم من localStorage ---
const formFields = {
  firstName: document.querySelector('#order-form input[placeholder="الاسم"]'),
  lastName: document.querySelector('#order-form input[placeholder="اللقب"]'),
  phone: document.getElementById('phone-input'),
  qty: document.getElementById('qty-input'),
  wilaya: document.getElementById('wilaya-select'),
  daira: document.getElementById('daira-select'),
  commune: document.getElementById('commune-select'),
  address: document.getElementById('address-input'),
  deliveryCompany: document.getElementById('delivery-company'),
  deliveryType: document.querySelectorAll('input[name="delivery"]'),
};

function saveFormToStorage() {
  const data = {
    firstName: formFields.firstName.value,
    lastName: formFields.lastName.value,
    phone: formFields.phone.value,
    qty: formFields.qty.value,
    wilaya: formFields.wilaya.value,
    daira: formFields.daira.value,
    commune: formFields.commune.value,
    address: formFields.address.value,
    deliveryCompany: formFields.deliveryCompany.value,
    deliveryType: document.querySelector('input[name="delivery"]:checked')?.value || '',
  };
  localStorage.setItem('orderFormData', JSON.stringify(data));
}

function loadFormFromStorage() {
  const data = JSON.parse(localStorage.getItem('orderFormData') || '{}');
  if (data.firstName) formFields.firstName.value = data.firstName;
  if (data.lastName) formFields.lastName.value = data.lastName;
  if (data.phone) formFields.phone.value = data.phone;
  if (data.qty) formFields.qty.value = data.qty;
  if (data.wilaya) formFields.wilaya.value = data.wilaya;
  if (data.daira) formFields.daira.value = data.daira;
  if (data.commune) formFields.commune.value = data.commune;
  if (data.address) formFields.address.value = data.address;
  if (data.deliveryCompany) formFields.deliveryCompany.value = data.deliveryCompany;
  if (data.deliveryType) {
    formFields.deliveryType.forEach(radio => {
      if (radio.value === data.deliveryType) radio.checked = true;
    });
  }
}

function clearFormStorage() {
  localStorage.removeItem('orderFormData');
}

// حفظ عند كل تغيير
Object.values(formFields).forEach(field => {
  if (field instanceof NodeList) {
    field.forEach(radio => radio.addEventListener('change', saveFormToStorage));
  } else if (field) {
    field.addEventListener('input', saveFormToStorage);
    field.addEventListener('change', saveFormToStorage);
  }
});

// استرجاع عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', loadFormFromStorage);

// حذف عند نجاح الإرسال
orderForm.addEventListener('submit', clearFormStorage);

// --- تحديث عدد الزوار الحاليين بشكل عشوائي ---
const liveViewers = document.getElementById('live-viewers');
function updateLiveViewers() {
  const n = Math.floor(Math.random() * 19) + 7; // من 7 إلى 25
  if (liveViewers) liveViewers.textContent = n;
  const miniNum = document.getElementById('live-viewers-mini-num');
  if (miniNum) miniNum.textContent = n;
}
updateLiveViewers();
setInterval(updateLiveViewers, Math.random() * 10000 + 10000); // كل 10-20 ثانية

// --- تمدد الشريط في الموبايل عند اللمس ---
const liveViewersBar = document.getElementById('live-viewers-bar');
const liveViewersFull = document.getElementById('live-viewers-full');
const liveViewersMini = document.getElementById('live-viewers-mini');
let liveViewersTimeout = null;
if (liveViewersBar && liveViewersFull && liveViewersMini) {
  liveViewersBar.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      liveViewersFull.classList.remove('hidden');
      liveViewersMini.classList.add('hidden');
      clearTimeout(liveViewersTimeout);
      liveViewersTimeout = setTimeout(() => {
        liveViewersFull.classList.add('hidden');
        liveViewersMini.classList.remove('hidden');
      }, 2000);
    }
  });
} 
