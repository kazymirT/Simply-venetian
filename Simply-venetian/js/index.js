document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll(".accordion-item");
  
    accordions.forEach((accordion) => {
      const title = accordion.querySelector(".accordion-title");
      const content = accordion.querySelector(".accordion-content");
      const icon = accordion.querySelector(".rotate-icon");
  
      title.addEventListener("click", () => {
        const isActive = content.classList.toggle("open");
        content.style.maxHeight = isActive ? `${content.scrollHeight}px` : "0px";
        icon.style.transform = isActive ? "rotate(90deg)" : "rotate(0deg)";
      });
    });
  });

  const gallerySwiper = new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: window.innerWidth > 768 ? '32' : '12',
    autoplay: {
      delay: 2000,
    },
    loopFillGroupWithBlank: true,
  });
  const bannerSwiper = new Swiper('.banner-swiper', {
    loop: true,
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
    type: 'bullets',
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    }
  })
 const b2bSwiper = new Swiper('.b2b-swiper', {
  pagination: {
    el: '.swiper-pagination',
  type: 'bullets',
  },
  slidesPerView: 'auto',
  loop: true,
  })
  const designsSwiper = new Swiper('.swiper-designs', {
    pagination: {
      el: '.swiper-pagination',
    type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
  })

  document.addEventListener('DOMContentLoaded', function() {
    const element = document.querySelector('.input-phone');
    const maskOptions = {
      mask: '+{44} (0000) 000-000'
    };
    const mask = IMask(element, maskOptions);
  });

  document.addEventListener('DOMContentLoaded', function() {
    

    const inputPhone = document.querySelector('.input-phone');
    const inputEmail = document.querySelector('.input-email');
    const inputName = document.querySelector('.input-name');
    const formSubmit = document.querySelector('.form-submit');
    const form = document.querySelector('.form-form');
    const formLoading = document.querySelector('.form-loading');
    const formError = document.querySelector('.form-error');
    const formSuccess = document.querySelector('.form-success');
    
    Array.from(document.querySelectorAll('.to-form')).map((element) => {
      element.addEventListener('click', () => {
        form.style.display = 'flex';
        formSuccess.style.display = 'none';
        formError.style.display = 'none'; 
      })
    })
    
    let phoneFirst = true;
    let emailFirst = true;
    let nameFirst = true;
    let isNameValid = false;
    let isEmailValid = false;
    let isPhoneValid = false;

    const submitForm = async () => {
      try {
      form.style.display = 'none'
      formLoading.style.display = 'flex'
       setTimeout(() => {
         formLoading.style.display = 'none'; 
         formError.style.display = 'flex';
        }, 2000);
      } catch {
        formSuccess.style.display = 'flex';
        formLoading.style.display = 'none'; 
      } finally {
        inputEmail.value = '';
        inputName.value = '';
        inputPhone.value = '';
        isNameValid = false;
        isEmailValid = false;
        isPhoneValid = false;
      }
    }
    formSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      formSubmit.disabled = true;
      submitForm();
    })
    const formValidate = () => {
      if (isEmailValid && isNameValid && isPhoneValid) {
        formSubmit.disabled = false;
      } else {
        formSubmit.disabled = true;
      }
    };
    const errorMessages = {
      email: ['Email is a required field', 'Please enter a valid email'],
      phone: ['Phone is a required field.', 'Please enter a valid phone number.'],
      name: ['Full name is a required field.', 'Only Latin alphabet can be used here.', 'The limitation is from 10 to 100 letters for this field.'],
    }
    const emailValid = (email, element) => {
      const isValidEmpty = validator.isEmpty(email); 
      const isValidMatches = validator.matches(email, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
      if (!isValidEmpty && isValidMatches) {
        isEmailValid = true;
        element.classList.remove('invalid');
        element.nextElementSibling.innerText = '';
      } else if (emailFirst) {
        return;
      } else {
        element.nextElementSibling.innerText = isValidEmpty && errorMessages.email[0] || !isValidMatches && errorMessages.email[1];
        element.classList.add('invalid');
        isEmailValid = false;
      }
      formValidate();
    }
    const phoneValid = (phone, element) => {
      const isValidEmpty = validator.isEmpty(phone); 
      const isValidMatches = validator.matches(phone, /^\+44 \(\d{4}\) \d{3}-\d{3}$/i)
      if (!isValidEmpty && isValidMatches) {
        isPhoneValid = true;
        element.classList.remove('invalid');
        element.nextElementSibling.innerText = '';
      } else if (phoneFirst) {
        return;
      } else {
        element.nextElementSibling.innerText = isValidEmpty && errorMessages.phone[0] || !isValidMatches && errorMessages.phone[1];
        element.classList.add('invalid');
        isPhoneValid = false;
      }
      formValidate();
    }
    const nameValid = (name, element) => {
      const isValidEmpty = validator.isEmpty(name); 
      const isValidLength = validator.isLength(name, { min: 10, max: 100 })
      const isValidMatches = validator.matches(name, /^[a-zA-Z ]+$/i)

      if (!isValidEmpty && isValidLength && isValidMatches) {
        isNameValid = true;
        element.classList.remove('invalid');
        element.nextElementSibling.innerText = '';
      } else if (nameFirst) {
        return;
      } 
      else {
        element.nextElementSibling.innerText = isValidEmpty && errorMessages.name[0] || !isValidLength && errorMessages.name[2] || !isValidMatches && errorMessages.name[1];
        element.classList.add('invalid');
        isNameValid = false;
      }
      formValidate();
    }

    inputName.addEventListener('blur', (element) => {
      nameFirst = false;
      nameValid(element.target.value, element.target)
    });
    inputName.addEventListener('input', (element) => {
        nameValid(element.target.value, element.target);
    });
    inputEmail.addEventListener('blur', (element) => {
      emailFirst = false;
      emailValid(element.target.value, element.target);
    });
    inputPhone.addEventListener('blur', (element) => {
      phoneFirst = false;
      phoneValid(element.target.value, element.target);
    });

    inputEmail.addEventListener('input', (element) => {
        emailValid(element.target.value, element.target)
    });
    inputPhone.addEventListener('input', (element) => {
        phoneValid(element.target.value, element.target);
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;

    const handleClick = function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToTarget(targetId, headerHeight);
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleClick);
    });

    function scrollToTarget(targetId, headerHeight) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const targetOffsetTop = targetElement.offsetTop - headerHeight;
        window.scrollTo({
          top: targetOffsetTop,
          behavior: 'smooth',
        });
      }
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const burgerIcon = document.querySelector('.burger-menu');
    const btnBurger = document.querySelector('.btn-burger');
    const overflow = document.querySelector('.overflow');

    btnBurger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      burgerIcon.classList.toggle('active');
      overflow.classList.toggle('active');
      if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'scroll'
      }
    })

    const closeBurgerMenu = () => {
      mobileMenu.classList.remove('active');
      burgerIcon.classList.remove('active');
      overflow.classList.remove('active');
      document.body.style.overflow = 'scroll'
    }
    overflow.addEventListener('click', () => {
      closeBurgerMenu();
    })
    const menuLinks = document.querySelectorAll(".mobile-link");
    menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
    event.preventDefault();
    closeBurgerMenu();
    const href = link.getAttribute("href");
    setTimeout(() => {
      window.location.href = href;
    }, 200);
  });
});
  })