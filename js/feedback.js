const modalFeedback = document.querySelector('.modal-feedback');
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
feedbackForm.addEventListener('submit', checkForm);
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
fillForm();
