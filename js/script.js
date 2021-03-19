const servicesControl = document.querySelector('.services-control');
const promoControl = document.querySelector('.promo-control');
const modalMapOpen = document.querySelector('.map-link');
const modalMap = document.querySelector('.modal-map');
const modalFeedback = document.querySelector('.modal-feedback');
const modalFeedbackOpen = document.querySelector('.feedback-link');
const clientNameField = modalFeedback.querySelector('.client-name');
const clientEmailField = modalFeedback.querySelector('.client-email');
const clientMessageField = modalFeedback.querySelector('.client-message');
const feedbackForm = document.querySelector('.feedback-form');
const feedbackFormFields = feedbackForm.querySelectorAll('.form-field');
let isStorageSupport = true;
let clientName = '';
let clientEmail = '';

try {
  clientName = localStorage.getItem("clientName");
  clientEmail = localStorage.getItem("clientEmail");
} catch (err) {
  isStorageSupport = false;
}

servicesControl.addEventListener('click', changeSlide);
promoControl.addEventListener('click', changeSlide);
modalMapOpen.addEventListener('click', function() {
  showModal(event, modalMap);
}, false);
modalFeedbackOpen.addEventListener('click', function() {
  showModal(event, modalFeedback);
}, false);
feedbackForm.addEventListener('submit', checkForm);

function changeSlide(event) {
  var element = event.target;
  if (element.classList.contains('slide-btn')) {
    const controlBtns = getSliderControls(element);
    const slides = getSlides(element);
    const index = [].indexOf.call(controlBtns, element);
    clearBtns(controlBtns);
    markCurrentBtn(element);
    slides.forEach(function(slide) {
      slide.classList.remove('slide-current');
    });
    slides[index].classList.add('slide-current')
  }
}

function clearBtns(btns) {
  btns.forEach(function(item) {
    item.classList.remove('current-btn');
  });
}

function markCurrentBtn(btn) {
  btn.classList.add("current-btn");
}

function getSliderControls(element) {
  const controlBtnsParent = element.closest('[class*="control"]');
  return controlBtnsParent.querySelectorAll('.slide-btn');
}

function getSlides(element) {
  const slider = element.closest('[class*="slider"]');
  return slider.querySelectorAll(".slide");
}

function showModal(event, modal) {
  event.preventDefault();
  modal.classList.remove('modal-hide');
  modal.addEventListener('click', function() {
    closeModal(modal);
  });
  window.addEventListener('keydown', function() {
    closeModal(modal);
  });
  if (modal.classList.contains('modal-feedback')) {
    fillForm();
  }
}

function closeModal(modal) {
  const item = event.target;
  if (item.classList.contains('modal-close') || event.keyCode == 27) {
    event.preventDefault();
    modal.classList.add('modal-hide');
    if (modal.classList.contains('modal-feedback')){
      removeFormError();
    }
    modal.removeEventListener('click', closeModal);
  }
}

function fillForm() {
  clientNameField.focus();
  if (clientName) {
    clientNameField.value = clientName;
    clientEmailField.focus();
  }
  if (clientEmail) {
    clientEmailField.value = clientEmail;
    clientMessageField.focus();
  }
}

function checkForm(event) {
  feedbackForm.classList.remove('error-form');
  feedbackForm.offsetWidth =  feedbackForm.offsetWidth;
  feedbackFormFields.forEach(function(field) {
    if (!field.value) {
      event.preventDefault();
      field.classList.add('error-field');
      field.addEventListener('keydown', function(){
        this.classList.remove('error-field');
      });
      feedbackForm.classList.add('error-form');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('clientName', clientNameField.value);
        localStorage.setItem('clientEmail', clientEmailField.value);
      }
    }
  })
}

function removeFormError(){
  if (feedbackForm.classList.contains('error-form')) {
    feedbackForm.classList.remove('error-form');
    feedbackFormFields.forEach(function(field){
      if(field.classList.contains('error-field')){
        field.classList.remove('error-field');
      }
    });
  }
}
