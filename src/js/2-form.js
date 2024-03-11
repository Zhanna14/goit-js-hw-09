const feedbackForm = document.querySelector('.feedback-form');
const textarea = feedbackForm.querySelector('textarea');
const feedbackFormState = 'feedback-form-state';

// Функція, що відправляє дані форми
function formSubmitSend(event) {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми

  // Отримуємо значення email і видаляємо пробіли
  const userEmail = feedbackForm.elements.email.value.trim();

  // Видаляємо пробіли з тексту повідомлення
  const text = textarea.value.trim();

  // Перевіряємо, чи обидва поля заповнені
  if (!userEmail || !text) {
    console.log('Будь ласка, заповніть обидва поля форми.');
    return; // Виходимо з функції, якщо не всі поля заповнені
  }

  // Зберігаємо дані у локальному сховищі
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

// Додаємо обробник події submit на формі
feedbackForm.addEventListener('submit', formSubmitSend);

// Функція для завантаження даних з локального сховища
function loadFromLocalStorage() {
  // Отримуємо збережені дані з локального сховища
  const storedData = localStorage.getItem(feedbackFormState);
  if (storedData) {
    // Розбираємо рядок JSON у об'єкт
    const formData = JSON.parse(storedData);

    // Встановлюємо значення полів форми відповідно до даних з локального сховища
    textarea.value = formData.message;
    feedbackForm.elements.email.value = formData.email;
  } else {
    // Якщо дані відсутні, очищуємо поля форми
    feedbackForm.elements.email.value = '';
    textarea.value = '';
  }
}

// Викликаємо функцію для завантаження даних з локального сховища при завантаженні сторінки
loadFromLocalStorage();
