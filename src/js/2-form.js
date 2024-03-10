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
}

// Відстежуємо подію submit на формі
feedbackForm.addEventListener('submit', formSubmitSend);

// Функція для завантаження даних з локального сховища
function loadFromLocalStorage() {
  try {
    const storedData = localStorage.getItem(feedbackFormState);
    if (storedData) {
      const formData = JSON.parse(storedData);
      textarea.value = formData.message;
      feedbackForm.elements.email.value = formData.email;
    } else {
      feedbackForm.elements.email.value = '';
      textarea.value = '';
    }
  } catch (error) {
      console.log(
          'no saved data'
    );
  }
}

// Завантажуємо збережені дані з локального сховища при завантаженні сторінки
loadFromLocalStorage();
