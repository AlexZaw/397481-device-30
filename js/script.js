const servicesControl = document.querySelector('.services-control');
const promoControl = document.querySelector('.promo-control');
servicesControl.addEventListener('click', changeSlide);
promoControl.addEventListener('click', changeSlide);

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
