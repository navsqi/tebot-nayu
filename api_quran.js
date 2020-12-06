const axios = require('axios');

exports.quran = async (surah, ayat) => {
  try {
    let reply;

    const { data } = await axios(`https://api.quran.sutanlab.id/surah/${surah}/${ayat}`);

    reply = `
${data.data.text.arab}\n
${data.data.translation.id}
  `;

    return reply;
  } catch (err) {
    console.log(err);
  }
};
