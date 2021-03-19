const servicesControl = document.querySelector('.services-control');
const promoControl = document.querySelector('.promo-control');
const modalMapOpen = document.querySelector('.map-link');
const modalMap = document.querySelector('.modal-map');
const modalFeedback = document.querySelector('.modal-feedback');
const modalFeedbackOpen = document.querySelector('.feedback-link');

servicesControl.addEventListener('click', changeSlide);
promoControl.addEventListener('click', changeSlide);
modalMapOpen.addEventListener('click', function(){
  showModal(event, modalMap);
},false);
modalFeedbackOpen.addEventListener('click', function(){
  showModal(event, modalFeedback);
},false);
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

function showModal(event,modal){
  event.preventDefault();
  modal.classList.remove('modal-hide');
  modal.addEventListener('click', closeModal)
}
function closeModal(event){
  const item = event.target;
  if(item.classList.contains('modal-close')){
    event.preventDefault();
    const parentModal = item.closest('.modal');
    parentModal.classList.add('modal-hide');
    parentModal.removeEventListener('click', closeModal);
  }
}

