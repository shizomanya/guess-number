"use strict";

/**
  Math.random() возвращает случайное число от 0 до 1 (не включая 1),
  умножаем на 100, чтобы получить диапазон от 0 до 100 (не включая 100),
  затем +1, чтобы сместить диапазон и получить числа от 1 до 100 включительно.
  Math.floor округляет результат вниз до целого.
*/
let randomNumber = Math.floor(Math.random() * 100) + 1;


/**
  document - объект представляющий всю html-страницу, 
  а getElementById - ищет в этой html-странице элементы с указанными атрибутами id 
  (если их нет - возвращает null)
 */
const input = document.getElementById("guessInput");
const message = document.getElementById("message");
const button = document.getElementById("checkBtn");
const restartBtn = document.getElementById("restartBtn");
const historyList = document.getElementById("historyList");

/**
  счетчик попыток и максимальное кол-во попыток
*/
let attempts = 0; 
const maxAttempts = 10;

function checkGuess() {
  const num = +input.value;
  attempts++;

  message.classList.remove("success", "error");

  if (!Number.isInteger(num)) {
    message.textContent = "Please enter a valid integer number";
    message.classList.add("error");
    return false;
  }

  if (num < 1 || num > 100) {
    /**
     textContent возвращает или устанавливает текст внутри HTML-тега с id="message"
    */
    message.textContent = "The number must be between 1 and 100";
    message.classList.add("error");
    return false;
  }

/**
  Создаем элемент списка для истории попыток и вставляем введенное число
*/
  const li = document.createElement("li");
  li.textContent = num; // только число
  historyList.appendChild(li);

  if (num > randomNumber) {
    message.textContent = "The guessed number is smaller";
    message.classList.add("error");
  } else if (num < randomNumber) {
    message.textContent = "The guessed number is larger";
    message.classList.add("error");
  } else {
    message.textContent = `You guessed it in ${attempts} attempt(s)`;
    message.classList.add("success");
    button.disabled = true;
  }
  /**
    Проверка на количество использованных попыток с максимальным и угаданно ли число
  */
  if (attempts >= maxAttempts && num !== randomNumber) {
    message.textContent = `You lost. The number was ${randomNumber}`;
    message.classList.add("error");
    button.disabled = true;
  }
}

/**
  Метод addEventListener орабатывает событие, когда пользователь нажмет на кнопку, то вызывается функция
 */
button.addEventListener("click", checkGuess);

/**
  При нажатии на кнопку перезапуска будет:
  генерироваться новое число, 
  сбрасываться попытки пользователя, 
  очищаться ввод,
  если кнопка была disabled - она разблокируется,
  очищается история попыток
 */
restartBtn.addEventListener("click", () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  input.value = "";
  message.textContent = "";
  button.disabled = false;
  historyList.innerHTML = "";
});
