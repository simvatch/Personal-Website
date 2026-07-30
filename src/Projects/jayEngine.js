const LANG_CODES = {
  afrikaans: "af", albanian: "sq", amharic: "am", arabic: "ar",
  armenian: "hy", azerbaijani: "az", basque: "eu", belarusian: "be",
  bengali: "bn", bosnian: "bs", bulgarian: "bg", catalan: "ca",
  chinese: "zh", corsican: "co", croatian: "hr", czech: "cs",
  danish: "da", dutch: "nl", english: "en", esperanto: "eo",
  estonian: "et", filipino: "tl", finnish: "fi", french: "fr",
  galician: "gl", georgian: "ka", german: "de", greek: "el",
  gujarati: "gu", "haitian creole": "ht", hebrew: "he", hindi: "hi",
  hungarian: "hu", icelandic: "is", indonesian: "id", irish: "ga",
  italian: "it", japanese: "ja", javanese: "jw", kannada: "kn",
  kazakh: "kk", khmer: "km", korean: "ko", kurdish: "ku",
  kyrgyz: "ky", lao: "lo", latin: "la", latvian: "lv",
  lithuanian: "lt", luxembourgish: "lb", macedonian: "mk",
  malagasy: "mg", malay: "ms", malayalam: "ml", maltese: "mt",
  maori: "mi", marathi: "mr", mongolian: "mn", myanmar: "my",
  nepali: "ne", norwegian: "no", pashto: "ps", persian: "fa",
  polish: "pl", portuguese: "pt", punjabi: "pa", romanian: "ro",
  russian: "ru", samoan: "sm", "scots gaelic": "gd", serbian: "sr",
  sesotho: "st", shona: "sn", sindhi: "sd", sinhala: "si",
  slovak: "sk", slovenian: "sl", somali: "so", spanish: "es",
  sundanese: "su", swahili: "sw", swedish: "sv", tajik: "tg",
  tamil: "ta", telugu: "te", thai: "th", turkish: "tr",
  ukrainian: "uk", urdu: "ur", uzbek: "uz", vietnamese: "vi",
  welsh: "cy", xhosa: "xh", yiddish: "yi", yoruba: "yo", zulu: "zu",
};

const WEATHER_CODES = {
  0: "clear sky", 1: "mainly clear", 2: "partly cloudy", 3: "overcast",
  45: "fog", 48: "freezing fog", 51: "light drizzle", 53: "drizzle",
  55: "heavy drizzle", 56: "freezing drizzle", 57: "freezing drizzle",
  61: "light rain", 63: "rain", 65: "heavy rain", 66: "freezing rain",
  67: "freezing rain", 71: "light snow", 73: "snow", 75: "heavy snow",
  77: "snow grains", 80: "light rain showers", 81: "rain showers",
  82: "violent rain showers", 85: "snow showers", 86: "heavy snow showers",
  95: "a thunderstorm", 96: "a thunderstorm with hail",
  99: "a thunderstorm with heavy hail",
};

const LEAGUES = {
  premier: { id: 4328, name: "Premier League" },
  champions: { id: 4480, name: "Champions League" },
  serie: { id: 4332, name: "Serie A" },
  laliga: { id: 4335, name: "La Liga" },
  bundesliga: { id: 4331, name: "Bundesliga" },
  ligue: { id: 4334, name: "Ligue 1" },
};

const numbersIn = (command) => (command.match(/\d+/g) || []).map(Number);

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

function subject(command, pattern) {
  const match = command.match(pattern);
  return match ? match[1].trim().replace(/[^a-zA-Z\s]/g, "").trim() : null;
}

async function getWeather(location) {
  if (!location) return "Please specify a city for the weather.";

  const geo = await getJson(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
  );
  const place = geo.results?.[0];
  if (!place) return `City '${location}' not found. Please check the location.`;

  const data = await getJson(
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
      "&current=apparent_temperature,weather_code&daily=temperature_2m_max,temperature_2m_min" +
      "&forecast_days=1&timezone=auto"
  );

  const description = WEATHER_CODES[data.current.weather_code] ?? "unsettled weather";
  const feelsLike = Math.round(data.current.apparent_temperature);
  const tempMax = Math.round(data.daily.temperature_2m_max[0]);
  const tempMin = Math.round(data.daily.temperature_2m_min[0]);
  const city = place.country ? `${place.name}, ${place.country}` : place.name;

  return (
    `There is ${description} in ${city}. ` +
    `It feels like ${feelsLike}°C with a high of ${tempMax}°C and a low of ${tempMin}°C.`
  );
}

const OPERATORS = [
  { symbols: ["**", "^"], apply: (a, b) => `${a} to the power of ${b} is ${a ** b}` },
  { symbols: ["*", "x", "×"], apply: (a, b) => `${a} times ${b} is ${a * b}` },
  {
    symbols: ["/", "÷"],
    apply: (a, b) =>
      b === 0 ? "Error: Division by zero is not allowed." : `${a} divided by ${b} is ${a / b}`,
  },
  { symbols: ["+"], apply: (a, b) => `${a} plus ${b} is ${a + b}` },
  { symbols: ["-", "−", "–"], apply: (a, b) => `${a} minus ${b} is ${a - b}` },
];

const NUMBER = "(\\d+(?:\\.\\d+)?)";
const escape = (symbol) => symbol.replace(/[*+^/-]/g, "\\$&");

function arithmetic(command) {
  for (const { symbols, apply } of OPERATORS) {
    for (const symbol of symbols) {
      const match = command.match(
        new RegExp(`${NUMBER}\\s*${escape(symbol)}\\s*${NUMBER}`)
      );
      if (match) return apply(Number(match[1]), Number(match[2]));
    }
  }

  const root = command.match(new RegExp(`√\\s*${NUMBER}`));
  if (root) {
    const value = Number(root[1]);
    return `The square root of ${value} is ${Math.round(Math.sqrt(value) * 100) / 100}`;
  }

  return null;
}

function factorial(num) {
  if (num < 0) return "Error: Factorial is not defined for negative numbers.";
  if (num > 170) return "That number is too large for me to handle.";
  let total = 1;
  for (let i = 2; i <= num; i++) total *= i;
  return `The factorial of ${num} is ${total}`;
}

const pad = (n) => String(n).padStart(2, "0");

function startTimer(command, emit) {
  const [amount] = numbersIn(command);
  if (amount === undefined) return "How long should the timer run for?";

  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (command.includes("second")) seconds = amount;
  else if (command.includes("hour")) hours = amount;
  else minutes = amount;

  const total = hours * 3600 + minutes * 60 + seconds;
  if (total <= 0) return "That timer would already be finished.";
  if (total > 3600) return "Timers in the demo are capped at one hour.";

  setTimeout(() => emit("Time's up!"), total * 1000);
  return `Timer started for ${pad(hours)}:${pad(minutes)}:${pad(seconds)}. I'll let you know when it's done.`;
}

function setAlarm(command, emit) {
  const [hours, minutes = 0] = numbersIn(command);
  if (hours === undefined) return "What time should I set the alarm for?";
  if (hours > 23 || minutes > 59) return "That isn't a valid time of day.";

  const target = new Date();
  target.setHours(hours, minutes, 0, 0);
  if (target <= new Date()) target.setDate(target.getDate() + 1);

  const wait = target.getTime() - Date.now();
  if (wait > 3600 * 1000) {
    return `Alarm set for ${pad(hours)}:${pad(minutes)}, but the demo only stays awake for an hour.`;
  }
  setTimeout(() => emit("Alarm ringing!"), wait);
  return `Alarm set for ${pad(hours)}:${pad(minutes)}.`;
}

function currentSeason() {
  const now = new Date();
  const startYear = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
  return `${startYear}-${startYear + 1}`;
}

function previousSeason() {
  const [start] = currentSeason().split("-").map(Number);
  return `${start - 1}-${start}`;
}

async function leagueResults(league) {
  const data = await getJson(
    `https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=${league.id}`
  );
  const events = data.events || [];
  const results = events
    .filter((event) => event.intHomeScore !== null && event.intAwayScore !== null)
    .map(
      (event) =>
        `${event.strHomeTeam} ${event.intHomeScore} - ${event.intAwayScore} ${event.strAwayTeam}`
    );

  if (!results.length) return `No recent ${league.name} results available.`;
  return `Latest ${league.name} results\n${results.join("\n")}`;
}

async function leagueTable(league) {
  for (const season of [currentSeason(), previousSeason()]) {
    const data = await getJson(
      `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${league.id}&s=${season}`
    );
    const table = data.table || [];
    if (table.length) {
      const rows = table.map(
        (team) => `${team.intRank}. ${team.strTeam} - ${team.intPoints} points`
      );
      return `${league.name} table (${season})\n${rows.join("\n")}`;
    }
  }
  return `No ${league.name} standings available right now.`;
}

function matchLeague(command) {
  if (command.includes("premier")) return LEAGUES.premier;
  if (command.includes("champions")) return LEAGUES.champions;
  if (command.includes("serie")) return LEAGUES.serie;
  if (command.includes("la liga")) return LEAGUES.laliga;
  if (command.includes("bundesliga")) return LEAGUES.bundesliga;
  if (command.includes("ligue")) return LEAGUES.ligue;
  return null;
}

async function cooking(item) {
  if (!item) return "What would you like a recipe for?";

  const data = await getJson(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(item)}`
  );
  const meal = data.meals?.[0];
  if (!meal) return `No recipe found for '${item}'.`;

  const name = meal.strMeal || "N/A";
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();
    if (ingredient) ingredients.push(measure ? `${measure} ${ingredient}` : ingredient);
  }

  return (
    `Recipe for ${name}\n` +
    `${"-".repeat(name.length + 11)}\n\n` +
    `Category: ${meal.strCategory || "N/A"}\n` +
    `Origin: ${meal.strArea || "N/A"}\n\n` +
    `Instructions:\n${meal.strInstructions || "N/A"}\n\n` +
    `Ingredients:\n` +
    ingredients.map((ing) => `- ${ing}`).join("\n")
  );
}

async function gardening(item) {
  if (!item) return "Which plant would you like to know about?";

  try {
    const page = await getJson(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(item)}`
    );
    if (page.extract && page.type === "standard") {
      return `${page.title}\n${"-".repeat(page.title.length)}\n\n${page.extract}`;
    }
  } catch {
    void 0;
  }

  const data = await getJson(
    "https://api.gbif.org/v1/species/search?rank=SPECIES&status=ACCEPTED&highertaxonKey=6&limit=1&q=" +
      encodeURIComponent(item)
  );
  const plant = data.results?.[0];
  if (!plant) return `No plant found for '${item}'.`;

  const english = plant.vernacularNames?.find((name) => name.language === "eng");
  const common = english?.vernacularName || item;
  const scientific = plant.species || plant.scientificName || "N/A";
  const family = plant.family || "N/A";

  return `The ${item} is commonly known as ${common}, with the scientific name ${scientific}, and belongs to the family ${family}.`;
}

async function translate(text, language) {
  const lang = LANG_CODES[language.toLowerCase()];
  if (!lang) return "That language is not recognized.";

  const data = await getJson(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`
  );
  const translated = data.responseData?.translatedText;
  if (!translated) return "Sorry, I couldn't translate that.";
  return translated;
}

function translationRequest(command) {
  const patterns = [
    /translate\s(.+?)\s(?:into|in)\s(\w+)/,
    /translate\s(?:into|in)\s(\w+)\s(.+)/,
    /(.+?)\s(?:in)\s(\w+)/,
  ];

  const [first, second, third] = patterns.map((pattern) => command.match(pattern));
  if (first) return { text: first[1].trim(), language: first[2].trim() };
  if (second) return { text: second[2].trim(), language: second[1].trim() };
  if (third) return { text: third[1].trim(), language: third[2].trim() };
  return null;
}

async function route(command, emit) {
  if (["weather", "forecast", "temperature", "rain", "sunny", "cloudy"].some((k) => command.includes(k))) {
    return getWeather(subject(command, /\b(?:in|of|at|for|location(?: of)?)\s+(.+)/));
  }

  if (command.includes("random")) {
    const [low, high] = numbersIn(command);
    if (low === undefined || high === undefined) return "Give me two numbers to pick between.";
    const value = Math.floor(Math.random() * (high - low + 1)) + low;
    return `Here is a random number between ${low} and ${high}: ${value}`;
  }

  const expression = arithmetic(command);
  if (expression) return expression;

  const maths = [
    [["multiplied", "times", "*", "multiply"], (a, b) => `${a} times ${b} is ${a * b}`],
    [["divided", "/", "divide"], (a, b) => (b === 0 ? "Error: Division by zero is not allowed." : `${a} divided by ${b} is ${a / b}`)],
    [["plus", "add", "+"], (a, b) => `${a} plus ${b} is ${a + b}`],
    [["minus", "subtract", "-"], (a, b) => `${a} minus ${b} is ${a - b}`],
    [["power", "^"], (a, b) => `${a} to the power of ${b} is ${a ** b}`],
  ];

  for (const [keywords, compute] of maths) {
    if (keywords.some((k) => command.includes(k))) {
      const [a, b] = numbersIn(command);
      if (a === undefined || b === undefined) return "I need two numbers for that.";
      return compute(a, b);
    }
  }

  const [firstNumber] = numbersIn(command);
  const needsNumber = "I need a number for that.";

  if (["square root", "sqrt", "root", "square rooted"].some((k) => command.includes(k))) {
    if (firstNumber === undefined) return needsNumber;
    if (firstNumber < 0) return "Error: Cannot take the square root of a negative number.";
    return `The square root of ${firstNumber} is ${Math.round(Math.sqrt(firstNumber) * 100) / 100}`;
  }
  if (command.includes("squared") || command.includes("square")) {
    if (firstNumber === undefined) return needsNumber;
    return `${firstNumber} squared is ${firstNumber ** 2}`;
  }
  if (command.includes("cubed") || command.includes("cube")) {
    if (firstNumber === undefined) return needsNumber;
    return `${firstNumber} cubed is ${firstNumber ** 3}`;
  }
  if (command.includes("factorial")) {
    if (firstNumber === undefined) return needsNumber;
    return factorial(firstNumber);
  }

  if (command.includes("timer")) return startTimer(command, emit);
  if (command.includes("alarm")) return setAlarm(command, emit);
  if (command.includes("time")) {
    return `The current time is ${new Date().toTimeString().slice(0, 5)}`;
  }
  if (command.includes("date")) {
    return `The date is ${new Date().toDateString()}`;
  }

  const league = matchLeague(command);
  if (league) {
    if (command.includes("scores") || command.includes("results")) return leagueResults(league);
    if (command.includes("table") || command.includes("standings")) return leagueTable(league);
    return `Would you like the ${league.name} table or the latest results?`;
  }

  if (["recipe", "recipes", "cooking", "cook", "make"].some((k) => command.includes(k))) {
    const named = subject(command, /\b(?:for|of|recipe(?: for)?)\s+(.+)/);
    const dish = (named || command)
      .replace(/[^a-z\s]/g, " ")
      .replace(/\b(how|do|i|you|me|a|an|the|some|please|give|show|find|tell|what|is|recipes?|cooking|cook|make)\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return cooking(dish);
  }
  if (["plants", "plant", "gardening", "garden"].some((k) => command.includes(k))) {
    const named = subject(command, /\b(?:for|of|about|type)\s+(.+)/);
    const stripped = (named || command)
      .replace(/[^a-z\s]/g, " ")
      .replace(/\b(tell|me|about|info|information|what|is|are|the|a|an|do|you|know|plants?|gardening|garden)\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return gardening(stripped);
  }

  if (command.includes("nuclear")) return "Please don't use nuclear weapons. It's not a good idea.";
  if (command.includes("bomb")) return "Please don't use bombs. It's really not a good idea.";

  if (["translate", "translated", "into", " in "].some((k) => command.includes(k))) {
    const request = translationRequest(command);
    if (!request) return "Sorry, I couldn't understand the translation request.";
    return translate(request.text, request.language);
  }

  if (["exit", "quit", "stop", "bye", "goodbye"].some((k) => command.includes(k))) {
    return "Goodbye!";
  }
  if (["hello", "hi", "hey", "greetings"].some((k) => command.includes(k))) {
    return "Hello! How can I assist you today?";
  }

  return "I'm sorry, I can't do that or I don't understand it yet.";
}

export async function jayExecute(rawCommand, emit = () => {}) {
  const command = rawCommand.toLowerCase().trim();
  if (!command) return "";

  try {
    return await route(command, emit);
  } catch (err) {
    return `Sorry, I couldn't fetch that right now (${err.message}).`;
  }
}

export const EXAMPLE_COMMANDS = [
  "what's the weather in Tokyo",
  "recipe for lasagne",
  "premier league table",
  "translate good morning into italian",
  "what is 12 times 8",
  "tell me about the lavender plant",
];
