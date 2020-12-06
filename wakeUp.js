const axios = require('axios');

const wakeUp = (url, interval = 2, callback) => {
  const milliseconds = interval * 60000;
  setTimeout(() => {
    try {
      console.log(`setTimeout called.`);
      // HTTP GET request to the 's url
      axios.get(url).then(() => console.log(`Fetching ${url}.`));
    } catch (err) {
      // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} 
          Will try again in ${interval} minutes...`);
    } finally {
      try {
        callback(); // execute callback, if passed
      } catch (e) {
        // catch callback error
        callback ? console.log('Callback failed: ', e.message) : null;
      } finally {
        // do it all again
        return wakeUp(url, interval, callback);
      }
    }
  }, milliseconds);
};

module.exports = wakeUp;
