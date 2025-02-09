// 요소 선택 및 상수 선언
const todaySpan = document.querySelector('#today');
const numbersDiv = document.querySelector('.numbers');
const drawButton = document.querySelector('#draw');
const resetButton = document.querySelector('#reset');
const lottoNumbers = [];
const colors = ['orange', 'skyblue', 'red', 'purple', 'green'];
const today = new Date();

let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
todaySpan.textContent = `${year}년 ${month}월 ${date}일 `;

// paintNumber 함수
function paintNumber(number) {
  const eachNumDiv = document.createElement('div'); // creating new element "eachNumDiv"
  eachNumDiv.classList.add('eachnum'); // add 'eachnum' class using .classList
  let colorIndex = Math.floor(number / 10); // 
  eachNumDiv.style.backgroundColor = colors[colorIndex];
  eachNumDiv.textContent = number;
  numbersDiv.appendChild(eachNumDiv);
}

