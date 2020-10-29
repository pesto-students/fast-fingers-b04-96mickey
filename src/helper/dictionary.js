let cachedDictionary = {};
let repeatedWords = {};

export const cacheDictionaryData = async () => {
  const wordArray = await (
    await fetch(
      'https://raw.githubusercontent.com/pesto-students/fast-fingers-b04-96mickey/master/data/dictionary.json'
    )
  ).json();
  cachedDictionary = wordArray.reduce((dictionary, word) => {
    const length = word.length;

    if (dictionary[length]) {
      dictionary[length].push(word);
    } else {
      dictionary[length] = [word];
    }

    return dictionary;
  }, {});

  return cachedDictionary;
};

export const getRandomWordFromDictionary = (length) => {
  const words = cachedDictionary[length];
  if (!words) {
    return null;
  }

  const randomIndex = parseInt(Math.random() * words.length);
  const word = words[randomIndex];
  if (repeatedWords[word]) {
    return getRandomWordFromDictionary(length);
  }
  repeatedWords[word] = true;
  
  return word;
};