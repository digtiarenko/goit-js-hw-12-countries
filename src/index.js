import './styles.css';
import resultTmp from './templates/result.hbs';
import shortResultTmp from './templates/shortResult.hbs';
import debounce from 'lodash.debounce';
import alert from './js/pnotify';
import fetchCountries from './js/fetchCountries';

const inputRef = document.getElementById('countryInput');
const resultRef = document.getElementById('result');

let name;
inputRef.addEventListener(
  'input',
  debounce(event => {
    name = event.target.value;
    fetchCountries(name).then(data => {
      if (data.message === 'Not Found') {
        resultRef.innerHTML = '';
        alert({
          text: 'Country is not found',
        });
        return;
      }

      if (data.length > 10) {
        alert({
          text: 'Too many matches found. Please specify your request',
        });
        return;
      }

      if (data.length <= 10 && data.length > 1) {
        updateShortCoutriesMarkup(data);
        return;
      } else {
        updateLongCountriesMarkUp(data);
      }
    });
  }, 500),
);

function updateShortCoutriesMarkup(dataMarkUp) {
  const markUp = shortResultTmp(dataMarkUp);
  resultRef.innerHTML = markUp;
}
function updateLongCountriesMarkUp(dataMarkUp) {
  const markUp = resultTmp(dataMarkUp);
  resultRef.innerHTML = markUp;
}
