const axios = require('axios');
const countryCodeLookup = require('iso-countries-lookup');

const moneyFormat = (price, sign = '$', delimeter = '.') => {
  const pieces = parseFloat(price).toFixed(2).split('');
  let ii = pieces.length - 3;
  while ((ii -= 3) > 0) {
    pieces.splice(ii, 0, delimeter);
  }
  return sign + pieces.join('').substr(0, pieces.length - 3);
};

exports.covidWorld = async (code) => {
  try {
    let reply;

    if (code === 'world') {
      const { data } = await axios('https://covid19.mathdro.id/api');

      reply = `
*World Summary*
😷 Confirmed: ${moneyFormat(data.confirmed.value, '')} 
🥰 Recovered: ${moneyFormat(data.recovered.value, '')}
💀 Deaths: ${moneyFormat(data.deaths.value, '')} 
  `;
    } else {
      const codeCountry = countryCodeLookup(code);
      const { data } = await axios(`https://covid19.mathdro.id/api/countries/${codeCountry}`);

      reply = `
*${codeCountry}*
😷 Confirmed: ${moneyFormat(data.confirmed.value, '')} 
🥰 Recovered: ${moneyFormat(data.recovered.value, '')}
💀 Deaths: ${moneyFormat(data.deaths.value, '')} 
  `;
    }

    return reply;
  } catch (err) {
    console.log(err);
  }
};
