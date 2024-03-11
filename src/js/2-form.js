const feedbackForm = document.querySelector('.feedback-form');
const textarea = feedbackForm.querySelector('textarea');
const feedbackFormState = 'feedback-form-state';

function formSubmitSend(event) {
  event.preventDefault();
  const userEmail = feedbackForm.elements.email.value.trim();
  const text = textarea.value.trim();
  if (!userEmail || !text) {
    console.log('Будь ласка, заповніть обидва поля форми.');
    return;
  }

  const data = JSON.stringify({
    email: userEmail,
    message: text,
  });
  localStorage.setItem(feedbackFormState, data);

  textarea.value = '';
  feedbackForm.elements.email.value = '';

  console.log({ email: userEmail, message: text }); // Виводимо об'єкт у консоль
}

feedbackForm.addEventListener('submit', formSubmitSend);

function loadFromLocalStorage() {
  const storedData = localStorage.getItem(feedbackFormState);
  if (storedData) {
    const formData = JSON.parse(storedData);
    textarea.value = formData.message;
    feedbackForm.elements.email.value = formData.email;
  } else {
    feedbackForm.elements.email.value = '';
    textarea.value = '';
  }
}

loadFromLocalStorage();
