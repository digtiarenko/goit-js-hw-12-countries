const resultRef = document.getElementById('result');
function fetchCountries(searchQuery) {
  resultRef.innerHTML = '';
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}?fields=name;capital;population;languages;flag`;
  return (
    fetch(url)
      .then(response => response.json())
      //   .then(data => {
      //     if (data.length > 10) {
      //       alert({
      //         text: 'Too many matches found. Please specify your request',
      //       });
      //       return;
      //     }
      //     if (data.length <= 10 && data.length > 1) {
      //       updateShortCoutriesMarkup(data);
      //       return;
      //     }
      //     if (data.status === '404') {
      //       resultRef.innerHTML = '';
      //     } else {
      //       updateLongCountriesMarkUp(data);
      //     }
      //   })
      .catch(error => {
        console.log(error);
      })
  );
}

export default fetchCountries;
