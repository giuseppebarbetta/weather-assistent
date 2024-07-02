const apiKey = '1b9d914d03bb85737c6bb47be62d7ccc';

//captura os dados da cidade pelo input e repassa para função buscar na API
function handleClick() {
  let cityInput = document.querySelector('#city');
  const city = cityInput.value;
  searchCity(city);
  cityInput.value = '';
}

//Busca na API os dados da cidade enviada no input e repassa para função atualizar os dados na tela
async function searchCity(city) {
  let data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric
`,
  ).then((info) => info.json());

  updateScreen(data);
}

//Atualiza a tela com os dados vindo da API referente a cidade enviada no input
function updateScreen(data) {
  const main = document.querySelector('#main');
  const temp = document.querySelector('.temp');
  const description = document.querySelector('.description');

  document.querySelector('.cityName').innerText = data.name;
  temp.innerText = Math.floor(data.main.temp);
  description.innerText = data.weather[0].description;

  document.querySelector('.humidity').innerText = data.main.humidity;
  document.querySelector(
    '.weatherIcon',
  ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  const classesToRemove = ['cold', 'sunny', 'cloudy', 'clouds', 'raining'];
  main.classList.remove(...classesToRemove);

  if (temp.innerText <= 10) {
    main.classList.add('cold');
  } else if (description.innerText == 'Céu Limpo') {
    main.classList.add('sunny');
  } else if (description.innerText == 'Nublado') {
    main.classList.add('cloudy');
  } else if (description.innerText.includes('Chuva')) {
    main.classList.add('raining');
  } else if (description.innerText.includes('Nuvens')) {
    main.classList.add('clouds');
  }
}
