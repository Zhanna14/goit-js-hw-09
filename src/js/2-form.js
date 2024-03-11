const feedbackForm = document.querySelector('.feedback-form');
const textarea = feedbackForm.querySelector('textarea');
const feedbackFormState = 'feedback-form-state';

// Функція для збереження даних в локальному сховищі
function formSubmitSend(event) {
  event.preventDefault();
  const userEmail = feedbackForm.elements.email.value; // Отримуємо значення email тут, щоб воно було актуальним під час натискання на кнопку відправки форми
  const text = textarea.value;
  const data = JSON.stringify({
    email: userEmail,
    message: text,
  });
  localStorage.setItem(feedbackFormState, data);

  // Очищаємо поля форми
  textarea.value = '';
  feedbackForm.elements.email.value = '';

  // Виводимо об'єкт з полями email та message у консоль
  console.log({ email: userEmail, message: text });
}

// Відстежуємо подію submit на формі
feedbackForm.addEventListener('submit', formSubmitSend);

// Функція для завантаження даних з локального сховища
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

// Завантажуємо збережені дані з локального сховища при завантаженні сторінки
loadFromLocalStorage();
