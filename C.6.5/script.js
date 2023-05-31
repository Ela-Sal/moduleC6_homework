const btn = document.querySelector('.j-btn-test');
const result = document.querySelector('.js-result');

btn.addEventListener('click', () => {
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
window.alert(`Размеры экрана: ширина:${screenWidth}, высота:${screenHeight}`);
 
})