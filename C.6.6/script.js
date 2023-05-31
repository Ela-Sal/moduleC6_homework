const wsUri = "wss://echo-ws-service.herokuapp.com";
const output = document.getElementById("output");
const btnOpen = document.querySelector('.j-btn-open');
const btnSend = document.querySelector('.j-btn-send');
 
const mapLink = document.getElementById("output");

let websocket;
function writeToScreen(message, cl) {
  let pre = document.createElement("p");
  pre.className   = cl;
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
  
  output.scrollTop = output.scrollHeight;
};

btnOpen.addEventListener('click', () => {
  let message = document.querySelector('.input').value;
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(event) {
    writeToScreen(`Вы: ${message}` , 'in');
    websocket.send(message);
  };
  
  websocket.onmessage = function(event) {
    //console.log(event.data)
    let inMessage = event.data;
    writeToScreen(` ${inMessage}` , 'out')
    //writeToScreen(
      //'<span style="color: blue;">RESPONSE: ' + event.data+'</span>
      //)
  };
  websocket.onerror = function(event) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ', 'out')
  };
});
    
  
 const error = () => {
   let status = "Невозможно получить ваше местоположение";
   writeToScreen(status , 'out')
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  //console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude)
  console.log(longitude)
  
  let mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  //writeToScreen(`<a  href='${mapLink}' target='_blank'>`)
  writeToScreen(`<a  href='${mapLink}' target='_blank'>Ваши координаты: ${latitude} / ${longitude}  ${mapLink}</a>` , 'out');
}

btnSend.addEventListener('click', () => {
    writeToScreen(`Вы: Гео-локация` , 'in');
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent += 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});