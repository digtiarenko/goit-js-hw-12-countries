import './styles.css';
import resultTmp from './templates/result.hbs';
import shortResultTmp from './templates/shortResult.hbs';
import debounce from 'lodash.debounce';
import alert from './js/pnotify';

const inputRef = document.getElementById('countryInput');
const resultRef = document.getElementById('result');

let name;
resultRef.innerHTML = '';

const debouncedEvent = event => {
  name = event.target.value;
  const url = `https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;population;languages;flag`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length > 10) {
        resultRef.innerHTML = '';
        alert({
          text: 'Too many matches found. Please specify your request',
        });
        return;
      }
      if (data.length <= 10 && data.length > 1) {
        console.log(data.length);
        const markUp = shortResultTmp(data);
        resultRef.innerHTML = markUp;
        return;
      } else {
        const markUp = resultTmp(data);
        resultRef.innerHTML = markUp;
      }
    })
    .catch(error => {
      resultRef.innerHTML = '';
      console.log(error);
    });
};

inputRef.addEventListener('input', debounce(debouncedEvent, 500));
