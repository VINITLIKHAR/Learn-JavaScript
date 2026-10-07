const InputBtn = document.getElementById('input');
const IncreaseBtn = document.getElementById('increase');
const ResetBtn = document.getElementById('reset');
const DecreaseBtn = document.getElementById('decrease');

let count = 0;

IncreaseBtn.addEventListener('click', () => {
    count++;
    InputBtn.textContent = count;
});

ResetBtn.addEventListener('click', () => {
    count = 0;
    InputBtn.textContent = count;
});

DecreaseBtn.addEventListener('click', () => {
    count--;
    InputBtn.textContent = count;
});