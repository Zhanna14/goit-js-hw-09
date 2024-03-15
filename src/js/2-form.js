const feedbackForm = document.querySelector('.feedback-form');
const textarea = feedbackForm.querySelector('textarea');
const userEmail = feedbackForm.elements.email;
const feedbackFormState = 'feedback-form-state';

// Додаємо обробник події input на поля форми, щоб зберігати дані у локальному сховищі при кожному введенні
userEmail.addEventListener('input', saveToLocalStorage);
textarea.addEventListener('input', saveToLocalStorage);

function saveToLocalStorage() {
  const email = userEmail.value.trim(); // Отримуємо значення email і видаляємо пробіли
  const text = textarea.value.trim(); // Отримуємо значення і видаляємо пробіли з тексту повідомлення

  const data = JSON.stringify({
    email: email,
    message: text,
  }); // локальне сховище
  localStorage.setItem(feedbackFormState, data); // зберігаємо дані
}

// Додаємо обробник події submit на формі
feedbackForm.addEventListener('submit', formSubmitSend);

function formSubmitSend(event) {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми

  const email = userEmail.value.trim(); // Отримуємо значення email і видаляємо пробіли
  const text = textarea.value.trim(); // Отримуємо значення і видаляємо пробіли з тексту повідомлення

  // Перевіряємо, чи обидва поля заповнені
  if (!email || !text) {
    alert('Будь ласка, заповніть обидва поля форми.');
    return; // Виходимо з функції, якщо не всі поля заповнені
  }

  const data = JSON.stringify({
    email: email,
    message: text,
  });

  localStorage.setItem(feedbackFormState, data); // зберігаємо дані

  // Виводимо об'єкт з полями email та message у консоль
  console.log({ email: email, message: text });

  feedbackForm.reset();
}

function loadFromLocalStorage() {
  // Отримуємо збережені дані з локального сховища
  const storedData = localStorage.getItem(feedbackFormState);

  if (storedData) {
    const formData = JSON.parse(storedData);

    // Встановлюємо значення полів форми відповідно до даних з локального сховища
    textarea.value = formData.message.trim();
    feedbackForm.elements.email.value = formData.email.trim();
  } else {
    // Якщо дані відсутні, очищуємо поля форми
    feedbackForm.elements.email.value = '';
    textarea.value = '';
  }
}

// Викликаємо функцію для завантаження даних з локального сховища при завантаженні сторінки
loadFromLocalStorage();
