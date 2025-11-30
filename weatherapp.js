const container = document.querySelector('.container');
const searchBtn = document.querySelector('.search button');
const input = document.querySelector('.search input');
const notfound = document.querySelector('.notfound');
const weatherbox = document.querySelector('.weatherbox');
const humidity = document.querySelector('.humidity span');
const wind = document.querySelector('.wind span');
const details = document.querySelector('.details');

const APIkey = 'b1c87877582855ce8530c59a1b45bbbe';

function searchWeather(event) {
  if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
    const city = input.value.trim();
    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
      .then(response => response.json())
      .then(json => {

        if (json.cod === '404') {
          container.style.height = '550px';
          container.style.width = '400px';
          container.style.bottom = '200px';
          weatherbox.style.display = 'none';
          details.style.display = 'none';
          notfound.style.display = 'block';
          notfound.classList.add('fade-in');
          return;
        }

       
        notfound.style.display = 'none';
        notfound.classList.remove('fade-in');
        details.style.display = 'flex';
        weatherbox.style.display = 'block';

        const image = document.querySelector('.weatherbox img');
        const temperature = document.querySelector('.weatherbox .temperature');
        const description = document.querySelector('.weatherbox .description');

        switch (json.weather[0].main) {
          case 'Clear': image.src = 'clear.png'; break;
          case 'Rain': image.src = 'rain.png'; break;
          case 'Snow': image.src = 'snow.png'; break;
          case 'Clouds': image.src = 'clouds.png'; break;
          case 'Haze': image.src = 'haze.png'; break;
          default: image.src = '';
        }

        temperature.textContent = `${Math.round(json.main.temp)}°C`;
        description.textContent = json.weather[0].description;
        humidity.textContent = json.main.humidity + '%';
        wind.textContent = json.wind.speed + ' km/h';

        container.style.height = '550px';
        container.style.width = '400px';
        container.style.bottom = '200px';

        container.classList.remove('fade-in');
        weatherbox.classList.remove('fade-in');
        details.classList.remove('fade-in');

        void container.offsetWidth; 

        weatherbox.classList.add('fade-in');
        details.classList.add('fade-in');
      });
  }
}

searchBtn.addEventListener('click', searchWeather);
input.addEventListener('keydown', searchWeather);
	