import throttle from "lodash.throttle";
//Відстежуй на формі подію input, і щоразу записуй у локальне
//сховище об'єкт з полями email і message, у яких зберігай 
//поточні значення полів форми.Нехай ключем для сховища буде 
//рядок "feedback-form-state".

const LOCALE_STORAGE_KEY = "feedback-form-state";
const formElement = document.querySelector("form");
const emailElement = document.querySelector('input[name="email"]');
const messageElement = document.querySelector('textarea[name="message"]');

loadPage();
const formFields = () => {
    const userData = {
        email: emailElement.value,
        message: messageElement.value,
    }
    // console.log(userData)
    const userDataJSON = JSON.stringify(userData);
    // console.log(userDataJSON);
    localStorage.setItem(LOCALE_STORAGE_KEY, userDataJSON);


};
formElement.addEventListener('input', throttle(formFields, 500));

//Під час завантаження сторінки перевіряй стан сховища, і якщо
//там є збережені дані, заповнюй ними поля форми.В іншому 
//випадку поля повинні бути порожніми.

function loadPage() {
    // let formInf = localStorage.getItem(LOCALE_STORAGE_KEY);
    // formInf = formInf ? JSON.parse(formInf) : '';
    let saveData = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saveData) {
        saveData = JSON.parse(saveData);
        Object.entries(saveData).forEach(([key, text]) => {
      formElement.elements[key].value = text || '';
    });
  }
}

//Під час сабміту форми очищуй сховище і поля форми, 
//а також виводь у консоль об'єкт з полями email, message 
//та їхніми поточними значеннями.

formElement.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  } else {
    let formData = JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY));
    console.log(formData);
    event.currentTarget.reset();
    localStorage.removeItem(LOCALE_STORAGE_KEY);
    formData = {};
  }
};