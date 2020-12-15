const axios = require('axios');

exports.quran = async (surah, ayat, tafsir = false) => {
  try {
    let reply;

    const { data } = await axios(`${process.env.API_URL_QURAN}/surah/${surah}/${ayat}`);

    if (tafsir) {
      reply = `
${data.data.tafsir.id.long}
  `;
    } else {
      reply = `
${data.data.text.arab}\n
${data.data.translation.id}
  `;
    }

    return reply;
  } catch (err) {
    console.log(err);
  }
};
